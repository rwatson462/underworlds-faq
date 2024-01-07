import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useTagStore = defineStore(
  'tag',
  () => {
    const tags = ref<string[]>([])

    const supabase = supabaseClient()

    loadTags().then()

    async function loadTags() {
      supabase
        .from('tags')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          tags.value = data.map(tag => tag.name).sort()
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

          tags.value.push(tag)
          tags.value.sort()
        })
    }

    async function deleteTag(tag: string) {
      return supabase
        .from('tags')
        .delete()
        .eq('name', tag)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          tags.value = tags.value.filter(tagName => tagName !== tag)
        })
    }

    return {
      tags,
      createTag,
      deleteTag,
    }
  }
)