import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useSourceStore = defineStore(
  'source',
  () => {
    const sources = ref<string[]>([])

    const supabase = supabaseClient()

    loadSources().then()

    async function loadSources() {
      supabase
        .from('question_sources')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          sources.value = data.map(source => source.name).sort()
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

          sources.value.push(source)
          sources.value.sort()
        })
    }

    async function deleteSource(source: string) {
      return supabase
        .from('question_sources')
        .delete()
        .eq('name', source)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          sources.value = sources.value.filter(sourceName => sourceName !== source)
        })
    }

    return {
      sources,
      createSource,
      deleteSource,
    }
  }
)