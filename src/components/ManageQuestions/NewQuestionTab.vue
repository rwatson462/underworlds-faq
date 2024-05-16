<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { useCardStore } from '@/stores/CardStore'
import { ref } from 'vue'
import { useSourceStore } from '@/stores/SourceStore'
import { useTagStore } from '@/stores/TagStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'
import type { EntryType } from '@/types'

const questionStore = useQuestionStore()
const sourceStore = useSourceStore()
const cardStore = useCardStore()
const tagStore = useTagStore()
const snackbarStore = useSnackbarStore()

const question = ref('')
const answer = ref('')
const source = ref('')
const entryType = ref<EntryType>('faq')
const cards = ref<string[]>([])
const tags = ref<string[]>([])
const saveError = ref('')
const loading = ref(false)

function createQuestion() {
  loading.value = true

  questionStore
    .createQuestion(question.value.trim(), answer.value.trim(), source.value, entryType.value, cards.value, tags.value)
    .then(() => {
      question.value = ''
      answer.value = ''
      source.value = ''
      entryType.value = 'faq'
      cards.value = []
      tags.value = []

      snackbarStore.trigger({ text: 'Question saved!' })
    })
    .catch((error: string) => saveError.value = error)
    .finally(() => loading.value = false)
}
</script>

<template>
  <form @submit.prevent="createQuestion()">
    <p v-if="saveError" class="text-red-500 font-semibold">{{ saveError }}</p>
    <v-autocomplete
      label="Entry Type"
      v-model="entryType"
      :items="[{id: 'faq', text: 'FAQ'}, {id: 'errata', text: 'Rules errata'}]"
      :item-title="item => item.text"
      :item-value="item => item.id"
      class="mt-2"
    />
    <v-textarea v-model="question" label="Question" class="mt-2" />
    <v-textarea v-model="answer" label="Answer" class="mt-2" />
    <v-autocomplete label="Source" v-model="source" :items="sourceStore.sources" class="mt-2" />
    <v-autocomplete label="Cards" v-model="cards" :items="cardStore.cards" :multiple="true" class="mt-2" />
    <v-autocomplete label="Tags" v-model="tags" :items="tagStore.tags" :multiple="true" class="mt-2" />

    <v-btn type="submit" color="primary" text="Create question" :disabled="loading" />
  </form>
</template>
