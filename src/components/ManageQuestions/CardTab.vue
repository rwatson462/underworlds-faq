<script setup lang="ts">
import { useCardStore } from '@/stores/CardStore'
import { ref } from 'vue'
import { useSnackbarStore } from '@/stores/SnackbarStore'

const cardStore = useCardStore()
const snackbarStore = useSnackbarStore()

const newCard = ref('')
const saveError = ref('')
const loading = ref(false)

const filter = ref('')

function createCard() {
  loading.value = true
  saveError.value = ''

  // Quick check if the card already exists
  if (cardStore.cards.filter(card => card === newCard.value).length > 0) {
    saveError.value = 'The card [' + newCard.value + '] already exists'
    loading.value = false
    return
  }

  cardStore
    .createCard(newCard.value)
    .then(() => {
      newCard.value = ''
      snackbarStore.trigger({ text: 'Card saved!' })
    })
    .catch((err: string) => saveError.value = err)
    .finally(() => loading.value = false)
}

function deleteCard(card: string) {
  cardStore
    .deleteCard(card)
    .then(() => snackbarStore.trigger({ text: 'Card [' + card + '] deleted', color: 'error' }))
}
</script>

<template>
  <form @submit.prevent="createCard()">
    <v-text-field v-model="newCard" label="Card" class="mt-2" />
    <p class="text-red-500 font-semibold text-sm mb-4" v-if="saveError">{{ saveError }}</p>
    <v-btn type="submit" color="primary" text="Create Card" :disabled="loading" />
  </form>
  <v-list>
    <v-list-subheader>Existing Cards</v-list-subheader>
    <v-list-item>
      <v-text-field v-model="filter" label="Search cards" class="mt-2" />
    </v-list-item>
    <v-list-item
      v-for="(card, key) in cardStore.cards.filter(c => c.toLowerCase().includes(filter.toLowerCase()))"
      :key="key"
      class="hover:bg-gray-100"
    >
      <div class="flex justify-between items-center">
        <span class="flex-grow">{{ card }}</span>
        <span>
          <v-btn size="small" variant="flat" @click="deleteCard(card)" icon="mdi-delete" />
        </span>
      </div>
    </v-list-item>
  </v-list>
</template>
