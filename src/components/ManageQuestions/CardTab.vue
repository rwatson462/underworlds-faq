<script setup lang="ts">
import { useCardStore } from '@/stores/CardStore'
import { ref } from 'vue'

const cardStore = useCardStore()

const newCard = ref('')
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)

const filter = ref('')

function createCard() {
  loading.value = true
  saveError.value = ''

  cardStore
    .createCard(newCard.value)
    .then(() => {
      newCard.value = ''
      showSnackbar.value = true
    })
    .catch((err: string) => saveError.value = err)
    .finally(() => loading.value = false)
}
</script>

<template>
  <form @submit.prevent="createCard()">
    <v-text-field v-model="newCard" label="Card" class="mt-2" />
    <p class="text-red-500 font-semibold text-sm" v-if="saveError">{{ saveError }}</p>
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
    >{{ card }}</v-list-item>
  </v-list>
  <v-snackbar v-model="showSnackbar" color="primary" location="bottom right" :timeout="2000">
    New card saved
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" text="Close" />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>