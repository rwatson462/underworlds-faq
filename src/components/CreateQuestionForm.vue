<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()

const question = ref('')
const answer = ref('')
const card = ref('')
const source = ref('')
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)

function createQuestion() {
  loading.value = true

  questionStore
    .createQuestion(question.value, answer.value, source.value, card.value)
    .then(() => {
      question.value = ''
      answer.value = ''
      source.value = ''
      card.value = ''

      showSnackbar.value = true
    })
    .catch((error: string) => saveError.value = error)
    .finally(() => loading.value = false)
}
</script>

<template>
  <form @submit.prevent="createQuestion()">
    <p v-if="saveError" class="text-red-500 font-semibold">{{ saveError }}</p>
    <v-text-field v-model="question" label="Question" />
    <v-text-field v-model="answer" label="Answer" />
    <v-text-field v-model="card" label="Card" />
    <v-select label="Source" v-model="source" :items="questionStore.sources" />

    <v-btn type="submit" color="primary" text="Create question" :disabled="loading" />
  </form>
  <v-snackbar v-model="showSnackbar" color="primary" location="bottom right" :timeout="2000">
    New question saved
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" text="Close" />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>