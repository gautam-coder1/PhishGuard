'use client'
import { useEffect } from 'react'
import { updateLearningProgress, getLearningProgress } from '@/lib/supabase/progress'

export function ProgressTracker({ topicId }: { topicId: string }) {
  useEffect(() => {
    // When the user visits the page, if their progress is 'not_started', set it to 'learning'
    getLearningProgress(topicId).then(progress => {
      if (!progress || progress.status === 'not_started') {
        updateLearningProgress(topicId, 'learning')
      }
    })
  }, [topicId])

  return null
}
