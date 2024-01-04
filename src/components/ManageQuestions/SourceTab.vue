<script setup lang="ts">
import { useQuestionStore } from '@/stores/QuestionStore'
import { ref } from 'vue'

const questionStore = useQuestionStore()

const newSource = ref('')
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)

function createSource() {
  loading.value = true

  questionStore
    .createSource(newSource.value)
    .then(() => newSource.value = '')
    .catch(err => saveError.value = err)
    .finally(() => loading.value = false)
}
</script>

<template>
  <form @submit.prevent="createSource()">
    <v-text-field v-model="newSource" label="Source" class="mt-2" />
    <p class="text-red-500 font-semibold text-sm" v-if="saveError">{{ saveError }}</p>
    <v-btn type="submit" color="primary" text="Create Source" :disabled="loading" />
  </form>
  <v-list>
    <v-list-subheader>Existing Sources</v-list-subheader>
    <v-list-item v-for="(source, key) in questionStore.sources" :key="key">{{ source }}</v-list-item>
  </v-list>
  <v-snackbar v-model="showSnackbar" color="primary" location="bottom right" :timeout="2000">
    New source saved
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false" text="Close" />
    </template>
  </v-snackbar>
</template>

<style scoped>

</style>