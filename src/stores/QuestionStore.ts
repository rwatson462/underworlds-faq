import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EntryType, Question } from '@/types'
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
        .order('id', {ascending: false})
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = data.map((question): Question => ({
            ...question,
            cards: JSON.parse(question.cards),
            tags: JSON.parse(question.tags),
          }))
        })
    }

    async function createQuestion(question: string, answer: string, source: string, entry_type: EntryType, cards: string[]|null = null, tags: string[] | null = null) {
      return await supabase
        .from('compiled_questions')
        .insert({
          question,
          answer,
          source,
          entry_type,
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

    async function updateQuestion(id: number, question: Question) {
      return supabase
        .from('compiled_questions')
        .update({
          question: question.question,
          answer: question.answer,
          source: question.source,
          entry_type: question.entry_type ?? 'faq',
          cards: JSON.stringify(question.cards),
          tags: JSON.stringify(question.tags),
        })
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadQuestions()
        })
    }

    async function deleteQuestion(id: number) {
      return supabase
        .from('compiled_questions')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = questions.value.filter(existingQuestion => existingQuestion.id !== id)
        })
    }

    function searchQuestions(search: string) {
      return questions.value.filter(({ question, answer, cards, tags }) => {
        // If nothing but whitespace is in the search box, return all results
        if (search.trim() === '') {
          return true
        }

        // Break down the search into words then check for each word in the questions
        const words = search.trim().split(' ').map(s => s.trim()).filter(s => s.length > 0).map(s => s.toLowerCase())

        const matches = words.filter(word => {
          if (question.toLowerCase().includes(word)) {
            return true
          }

          if (answer.toLowerCase().includes(word)) {
            return true
          }

          for (const card of cards ?? []) {
            if (card.toLowerCase().includes(word)) {
              return true
            }
          }

          for (const tag of tags ?? []) {
            if (tag.toLowerCase().includes(word)) {
              return true
            }
          }

          return false
        })

        return matches.length === words.length
      })
    }

    return {
      questions,
      createQuestion,
      deleteQuestion,
      updateQuestion,
      searchQuestions,
    }
  }
)