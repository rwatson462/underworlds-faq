<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { computed, ref } from 'vue'
import type { Question } from '@/types'
import UpdateQuestionDialog from '@/components/Dialogs/UpdateQuestionDialog.vue'

const questionStore = useQuestionStore()

const editQuestionForm = ref<Question>({
  id: 0,
  question: '',
  answer: '',
  source: '',
  cards: [],
  tags: [],
  entry_type: 'faq',
})

const showEditQuestionModal = ref(false)

const search = ref('')
const filtered = computed<Question[]>(() => questionStore.questions.filter(({ question, answer, cards, tags }) => {
  // If nothing but whitespace is in the search box, return all results
  if (search.value.trim() === '') {
    return true
  }

  // Break down the search into words then check for each word in the questions
  const words = search.value.trim().split(' ').map(s => s.trim()).filter(s => s.length > 0).map(s => s.toLowerCase())

  const matches = words.filter(word => {
    if (question.toLowerCase().includes(word)) {
      return true
    }

    if (answer.toLowerCase().includes(word)) {
      return true
    }

    for (const card of cards ?? []) {
      if (card.toLowerCase().includes(word)) {
        return true
      }
    }

    for (const tag of tags ?? []) {
      if (tag.toLowerCase().includes(word)) {
        return true
      }
    }

    return false
  })

  return matches.length === words.length
}))

function showEditModal(question: string) {
  editQuestionForm.value = questionStore.questions.find(q => q.question === question)!
  showEditQuestionModal.value = true
}

function cancelEditQuestionModal() {
  editQuestionForm.value = {
    question: '',
    answer: '',
    source: '',
    cards: [],
    tags: [],
    entry_type: 'faq',
  }
  showEditQuestionModal.value = false
}

</script>

<template>
  <v-list>
    <v-list-subheader>All questions</v-list-subheader>
    <v-list-item>
      <v-text-field v-model="search" label="Search questions" class="mt-2" />
    </v-list-item>
  </v-list>
  <v-table>
    <thead>
    <tr>
      <th>Question</th>
      <th>Cards</th>
      <th>Tags</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(question, key) in filtered" :key="key">
        <td>{{ question.question }}</td>
        <td class="whitespace-pre">{{ (question.cards ?? []).join('\n') }}</td>
        <td class="whitespace-pre">{{ (question.tags ?? []).join('\n') }}</td>
        <td class="text-no-wrap">
          <v-btn size="small" variant="flat" @click="showEditModal(question.question)" icon="mdi-circle-edit-outline" />
          <v-btn size="small" variant="flat" @click="questionStore.deleteQuestion(question.question)" icon="mdi-close" />
        </td>
      </tr>
    </tbody>
    <UpdateQuestionDialog :edit-question-form="editQuestionForm" :show-edit-question-modal="showEditQuestionModal" @close-modal="cancelEditQuestionModal" />
  </v-table>
</template>
