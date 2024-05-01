<script setup lang="ts">

import { useSourceStore } from '@/stores/SourceStore'
import { useCardStore } from '@/stores/CardStore'
import { useTagStore } from '@/stores/TagStore'
import { useQuestionStore } from '@/stores/QuestionStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'

const emit = defineEmits(['close-modal'])

const sourceStore = useSourceStore()
const cardStore = useCardStore()
const tagStore = useTagStore()
const questionStore = useQuestionStore()
const snackbarStore = useSnackbarStore()

const props = defineProps([
  'editQuestionForm',
  'showEditQuestionModal'
])

function saveQuestion() {
  questionStore
    .updateQuestion(props.editQuestionForm)
    .then(() => snackbarStore.trigger({ text: 'Card updated' }))
  emit('close-modal')
}

</script>

<template>
  <v-dialog :model-value="props.showEditQuestionModal" @update:model-value="emit('close-modal')" width="768px">
    <form @submit.prevent="saveQuestion()">
      <v-card>
        <v-card-title>Edit Question</v-card-title>

        <v-card-text>
          <v-textarea v-model="editQuestionForm.question" class="mt-2" label="Question" />
          <v-textarea v-model="editQuestionForm.answer" class="mt-2" label="Answer" />
          <v-autocomplete label="Source" v-model="editQuestionForm.source" :items="sourceStore.sources" class="mt-2" />
          <v-autocomplete label="Cards" v-model="editQuestionForm.cards" :items="cardStore.cards" :multiple="true" class="mt-2" />
          <v-autocomplete label="Tags" v-model="editQuestionForm.tags" :items="tagStore.tags" :multiple="true" class="mt-2" />
        </v-card-text>

        <v-card-actions class="flex justify-between">
          <v-btn text="Save" type="submit" variant="flat" color="primary" />
          <v-btn text="Cancel" variant="text" @click="emit('close-modal')" />
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
