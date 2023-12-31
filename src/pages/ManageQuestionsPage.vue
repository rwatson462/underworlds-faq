<script setup lang="ts">

import { ref } from 'vue'
import { supabaseClient } from '@/helpers/supabaseClient'
import Heading from '@/components/Heading.vue'
import { useQuestionStore } from '@/stores/QuestionStore'
import CreateSourceForm from '@/components/CreateSourceForm.vue'

const questionStore = useQuestionStore()

const question = ref('')
const answer = ref('')
const source = ref('')
const error = ref('')

function createQuestion() {
  supabaseClient()
    .from('')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading text="Manage questions" />

    <CreateSourceForm />

    <form @submit.prevent="createQuestion()" class="border p-4">
      <p v-if="error" class="text-red-500 font-semibold">{{ error }}</p>
      <v-text-field v-model="question" label="Question" />
      <v-text-field v-model="answer" label="Answer" />
      <v-select label="Source" v-model="source" :items="questionStore.sources" />

      <v-btn type="submit" color="primary" text="Create question" />
    </form>
  </div>
</template>

<style scoped>

</style>