<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'

const questionStore = useQuestionStore()

function showEditModal() {
  // todo
}

</script>

<template>
  <v-table>
    <thead>
    <tr>
      <td>Question</td>
      <td class="w-8 text-right">Actions</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(question, key) in questionStore.questions" :key="key">
      <td>{{ question.question }}</td>
      <td class="text-right flex gap-2">
        <v-btn size="small" variant="flat" @click="showEditModal()" icon="mdi-circle-edit-outline" />
        <v-btn size="small" variant="flat" @click="questionStore.deleteQuestion(question.question)" icon="mdi-close" />
      </td>
    </tr>
    </tbody>
  </v-table>
  <v-dialog>
<!--    <template v-slot:default="{ showDialog }">-->

<!--    </template>-->
  </v-dialog>
</template>
