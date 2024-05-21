<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { computed, ref } from 'vue'
import type { Question } from '@/types'
import UpdateQuestionDialog from '@/components/Dialogs/UpdateQuestionDialog.vue'

const questionStore = useQuestionStore()

// todo: solve this little riddle of the vue lint error
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
const filtered = computed(() => questionStore.searchQuestions(search.value))

function deleteQuestion(id: number | undefined) {
  if (id === undefined) {
    throw new Error('ID is undefined')
  }

  questionStore.deleteQuestion(id)
}

function showEditModal(id: number | undefined) {
  if (id === undefined) {
    throw new Error('Question ID is undefined')
  }

  editQuestionForm.value = questionStore.questions.find(q => q.id === id)!
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
          <v-btn size="small" variant="flat" @click="showEditModal(question.id)" icon="mdi-circle-edit-outline" />
          <v-btn size="small" variant="flat" @click="deleteQuestion(question.id)" icon="mdi-close" />
        </td>
      </tr>
    </tbody>
    <UpdateQuestionDialog :edit-question-form="editQuestionForm" :show-edit-question-modal="showEditQuestionModal" @close-modal="cancelEditQuestionModal" />
  </v-table>
</template>
