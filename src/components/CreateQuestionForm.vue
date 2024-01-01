<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()

const question = ref('')
const answer = ref('')
const source = ref('')
const cards = ref<string[]>([])
const tags = ref<string[]>([])
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)

function createQuestion() {
  loading.value = true

  questionStore
    .createQuestion(question.value.trim(), answer.value.trim(), source.value, cards.value, tags.value)
    .then(() => {
      question.value = ''
      answer.value = ''
      source.value = ''
      cards.value = []
      tags.value = []

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
    <v-select label="Source" v-model="source" :items="questionStore.sources" />
    <v-select label="Cards" v-model="cards" :items="questionStore.cards" :multiple="true" />
    <v-select label="Tags" v-model="tags" :items="questionStore.tags" :multiple="true" />

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