import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useCardStore = defineStore(
  'card',
  () => {
    const cards = ref<string[]>([])

    const supabase = supabaseClient()

    loadCards().then()

    async function loadCards() {
      supabase
        .from('cards')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          cards.value = data.map(card => card.name).sort()
        })
    }

    async function createCard(card: string) {
      return supabase
        .from('cards')
        .insert({
          name: card
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          cards.value.push(card)
          cards.value.sort()
        })
    }

    async function deleteCard(card: string) {
      return supabase
        .from('cards')
        .delete()
        .eq('name', card)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          cards.value = cards.value.filter(cardName => cardName !== card)
        })
    }

    return {
      cards,
      createCard,
      deleteCard,
    }
  }
)