import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { Question } from '@/types'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useQuestionStore = defineStore(
  'question',
  () => {
    const questions = ref<Question[]>([])

    const supabase = supabaseClient()

    loadQuestions().then()

    async function loadQuestions() {
      supabase
        .from('compiled_questions')
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = data.map((question): Question => ({
            id: question.id,
            question: question.question,
            answer: question.answer,
            source: question.source,
            cards: JSON.parse(question.cards),
            tags: JSON.parse(question.tags),
          }))
        })
    }

    async function createQuestion(question: string, answer: string, source: string, cards: string[]|null = null, tags: string[] | null = null) {
      return await supabase
        .from('compiled_questions')
        .insert({
          question,
          answer,
          source,
          cards: JSON.stringify(cards),
          tags: JSON.stringify(tags),
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadQuestions()
      })
    }

    async function updateQuestion(question: Question) {
      return supabase
        .from('compiled_questions')
        .update({
          question: question.question,
          answer: question.answer,
          source: question.source,
          cards: JSON.stringify(question.cards),
          tags: JSON.stringify(question.tags),
        })
        .eq('id', question.id)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadQuestions()
        })
    }

    async function deleteQuestion(question: string) {
      return supabase
        .from('compiled_questions')
        .delete()
        .eq('question', question)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = questions.value.filter(existingQuestion => existingQuestion.question !== question)
        })
    }

    return {
      questions,
      createQuestion,
      deleteQuestion,
      updateQuestion,
    }
  }
)