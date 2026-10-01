import { createClient } from './client'
import type { Database } from './database.types'

type LearningProgress = Database['public']['Tables']['learning_progress']['Row']
type FlashcardProgress = Database['public']['Tables']['flashcard_progress']['Row']

export async function getLearningProgress(topicId: string): Promise<any> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('topic_id', topicId)
    .maybeSingle()
  
  if (error) {
    console.error('Error fetching progress:', error)
    return null
  }
  return data
}

export async function updateLearningProgress(
  topicId: string, 
  status: LearningProgress['status'],
  quizScore?: number
): Promise<any> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const payload: any = {
    user_id: user.id,
    topic_id: topicId,
    status,
    updated_at: new Date().toISOString()
  }

  if (quizScore !== undefined) {
    payload.quiz_score = quizScore
  }
  
  if (status === 'completed' || status === 'mastered') {
    payload.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('learning_progress')
    .upsert(payload, { onConflict: 'user_id,topic_id' } as any)
    .select()
    .single()

  if (error) {
    console.error('Error updating progress:', error)
    return null
  }
  return data
}

export async function getFlashcardProgress(topicId: string): Promise<any[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('flashcard_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('topic_id', topicId)

  if (error) {
    console.error('Error fetching flashcard progress:', error)
    return []
  }
  return data || []
}

export async function updateFlashcardStatus(
  topicId: string,
  flashcardId: string,
  status: FlashcardProgress['status']
): Promise<any> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // First check if it exists to increment review count
  const { data: existing } = await supabase
    .from('flashcard_progress')
    .select('review_count')
    .eq('user_id', user.id)
    .eq('topic_id', topicId)
    .eq('flashcard_id', flashcardId)
    .maybeSingle()

  const reviewCount = (existing ? (existing as any).review_count : 0) + 1

  const { data, error } = await supabase
    .from('flashcard_progress')
    .upsert({
      user_id: user.id,
      topic_id: topicId,
      flashcard_id: flashcardId,
      status,
      review_count: reviewCount,
      last_reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as any, { onConflict: 'user_id,topic_id,flashcard_id' } as any)
    .select()
    .single()

  if (error) {
    console.error('Error saving flashcard progress:', error)
    return null
  }
  
  return data
}

export async function saveQuizAttempt(
  topicId: string,
  score: number,
  totalQuestions: number,
  answers: { questionId: string, selectedAnswer: string, correct: boolean }[]
): Promise<any> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const percentage = Math.round((score / totalQuestions) * 100)

  // 1. Insert attempt
  const { data: attempt, error: attemptError } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: user.id,
      topic_id: topicId,
      score,
      total_questions: totalQuestions,
      percentage
    } as any)
    .select()
    .single()

  if (attemptError || !attempt) {
    console.error('Error saving quiz attempt:', attemptError)
    return null
  }

  // 2. Insert answers
  const answerPayload = answers.map(a => ({
    attempt_id: (attempt as any).id,
    question_id: a.questionId,
    selected_answer: a.selectedAnswer,
    correct: a.correct
  }))

  const { error: answersError } = await supabase
    .from('quiz_answers')
    .insert(answerPayload as any)

  if (answersError) {
    console.error('Error saving quiz answers:', answersError)
  }

  // 3. Update learning progress to completed or mastered if they passed
  if (percentage >= 70) {
    await updateLearningProgress(topicId, percentage >= 90 ? 'mastered' : 'completed', percentage)
  } else {
    await updateLearningProgress(topicId, 'quiz_attempted', percentage)
  }

  return attempt
}

export async function getDashboardStats(): Promise<any> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [progressRes, attemptsRes, flashcardsRes] = await Promise.all([
    supabase.from('learning_progress').select('*').eq('user_id', user.id),
    supabase.from('quiz_attempts').select('score,total_questions,percentage').eq('user_id', user.id),
    supabase.from('flashcard_progress').select('status').eq('user_id', user.id)
  ])

  const progress: any[] = progressRes.data ?? []
  const attempts: any[] = attemptsRes.data ?? []
  const flashcards: any[] = flashcardsRes.data ?? []

  const completedTopics = progress.filter(p => p.status === 'completed' || p.status === 'mastered')
  
  // Calculate average quiz score
  let avgQuizScore = 0
  if (attempts.length > 0) {
    const totalScore = attempts.reduce((sum, a) => sum + Number(a.percentage), 0)
    avgQuizScore = Math.round(totalScore / attempts.length)
  }

  const knownCards = flashcards.filter(f => f.status === 'known').length

  // Find latest topic being learned
  const inProgress = progress.filter(p => p.status === 'learning' || p.status === 'flashcards_done')
  inProgress.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  
  const lastActiveTopicId = inProgress.length > 0 ? inProgress[0].topic_id : 
    (progress.length > 0 ? progress.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0].topic_id : null)

  return {
    progress,
    completedCount: completedTopics.length,
    knownFlashcardsCount: knownCards,
    quizzesCompletedCount: attempts.length,
    avgQuizScore,
    lastActiveTopicId
  }
}
