<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'

const questionStore = useQuestionStore()

</script>

<template>
  <v-table>
    <thead>
    <tr>
      <td>Question</td>
      <td class="w-8">Actions</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(question, key) in questionStore.questions" :key="key">
      <td v-text="question.question" />
      <td class="text-right"><v-btn size="small" variant="flat" @click="questionStore.deleteQuestion(question.question)" icon="mdi-close" /></td>
    </tr>
    </tbody>
  </v-table>
</template>
