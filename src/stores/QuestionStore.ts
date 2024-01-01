import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question } from '@/types'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useQuestionStore = defineStore(
  'question',
  () => {
    const sources = ref<string[]>([])
    const tags = ref<string[]>([])
    const questions = ref<Question[]>([])

    const supabase = supabaseClient()

    loadSources()
    loadQuestions()
    loadTags()

    async function loadSources() {
      supabase
        .from('question_sources')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          sources.value = data.map(source => source.name)
        })
    }

    async function loadTags() {
      supabase
        .from('tags')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          tags.value = data.map(tag => tag.name)
        })
    }

    async function loadQuestions() {
      supabase
        .from('compiled_questions')
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = data
        })
    }

    async function createSource(source: string) {
      return supabase
        .from('question_sources')
        .insert({
          name: source
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadSources()
        })
    }

    async function createTag(tag: string) {
      return supabase
        .from('tags')
        .insert({
          name: tag
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadTags()
        })
    }

    async function createQuestion(question: string, answer: string, source: string, associated_card: string|null = null) {
      return await supabase
        .from('compiled_questions')
        .insert({
          question,
          answer,
          source,
          associated_card
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }
      })
    }

    return {
      sources,
      questions,
      tags,
      createSource,
      createQuestion,
      createTag,
    }
  }
)