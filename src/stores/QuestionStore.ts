import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question, Source } from '@/types'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useQuestionStore = defineStore(
  'question',
  () => {
    const sources = ref<Source[]>([])
    const questions = ref<Question[]>([])

    const supabase = supabaseClient()

    loadSources()

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

    async function createSource(source: string) {
      supabase
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

    return {
      sources,
      questions,
      createSource
    }
  }
)