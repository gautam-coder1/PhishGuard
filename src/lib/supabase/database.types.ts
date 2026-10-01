export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          status: 'not_started' | 'learning' | 'flashcards_done' | 'quiz_attempted' | 'completed' | 'mastered'
          quiz_score: number | null
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic_id: string
          status?: 'not_started' | 'learning' | 'flashcards_done' | 'quiz_attempted' | 'completed' | 'mastered'
          quiz_score?: number | null
          completed_at?: string | null
          updated_at?: string
        }
        Update: {
          status?: 'not_started' | 'learning' | 'flashcards_done' | 'quiz_attempted' | 'completed' | 'mastered'
          quiz_score?: number | null
          completed_at?: string | null
          updated_at?: string
        }
      }
      flashcard_progress: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          flashcard_id: string
          status: 'new' | 'learning' | 'known' | 'review'
          review_count: number
          last_reviewed_at: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic_id: string
          flashcard_id: string
          status?: 'new' | 'learning' | 'known' | 'review'
          review_count?: number
          last_reviewed_at?: string | null
          updated_at?: string
        }
        Update: {
          status?: 'new' | 'learning' | 'known' | 'review'
          review_count?: number
          last_reviewed_at?: string | null
          updated_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          score: number
          total_questions: number
          percentage: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic_id: string
          score: number
          total_questions: number
          percentage: number
          completed_at?: string
        }
        Update: never
      }
      quiz_answers: {
        Row: {
          id: string
          attempt_id: string
          question_id: string
          selected_answer: string
          correct: boolean
          created_at: string
        }
        Insert: {
          id?: string
          attempt_id: string
          question_id: string
          selected_answer: string
          correct: boolean
          created_at?: string
        }
        Update: never
      }
      mistake_reviews: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          question_id: string
          reviewed: boolean
          reviewed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          topic_id: string
          question_id: string
          reviewed?: boolean
          reviewed_at?: string | null
        }
        Update: {
          reviewed?: boolean
          reviewed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
