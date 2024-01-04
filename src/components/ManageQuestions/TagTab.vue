<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()

const newTag = ref('')
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)
const filter = ref('')

function createTag() {
  loading.value = true
  saveError.value = ''

  questionStore
    .createTag(newTag.value)
    .then(() => {
      newTag.value = ''

    })
    .catch((err: string) => saveError.value = err)
    .finally(() => loading.value = false)
}
</script>

<template>
  <form @submit.prevent="createTag()">
    <v-text-field v-model="newTag" label="Tag" />
    <p class="text-red-500 font-semibold text-sm" v-if="saveError">{{ saveError }}</p>
    <v-btn type="submit" color="primary" text="Create Tag" :disabled="loading" />
  </form>
  <v-list>
    <v-list-subheader>Existing Tags</v-list-subheader>
    <v-list-item>
      <v-text-field v-model="filter" label="Search tags" />
    </v-list-item>
    <v-list-item
      v-for="(tag, key) in questionStore.tags.filter(c => c.toLowerCase().includes(filter.toLowerCase()))"
      :key="key"
    >{{ tag }}</v-list-item>
  </v-list>
  <v-snackbar v-model="showSnackbar" color="primary" location="bottom right" :timeout="2000">
    New tag saved
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" text="Close" />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>