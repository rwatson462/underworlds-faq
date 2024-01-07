<script setup lang="ts">
import { ref } from 'vue'
import { useSourceStore } from '@/stores/SourceStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'

const sourceStore = useSourceStore()
const snackbarStore = useSnackbarStore()

const newSource = ref('')
const saveError = ref('')
const loading = ref(false)

function createSource() {
  loading.value = true

  // Quick check if the card already exists
  if (sourceStore.sources.filter(source => source === newSource.value).length > 0) {
    saveError.value = 'The source [' + newSource.value + '] already exists'
    loading.value = false
    return
  }

  sourceStore
    .createSource(newSource.value)
    .then(() => {
      newSource.value = ''
      snackbarStore.trigger({ text: 'New source created' })
    })
    .catch(err => saveError.value = err)
    .finally(() => loading.value = false)
}

function deleteSource(source: string) {
  sourceStore
    .deleteSource(source)
    .then(() => snackbarStore.trigger({
      text: 'Source [' + source + '] deleted',
      color: 'error'
    }))
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
    <v-list-item v-for="(source, key) in sourceStore.sources" :key="key" class="hover:bg-gray-100">
      <div class="flex justify-between items-center">
        <span class="flex-grow">{{ source }}</span>
        <span>
          <v-btn size="small" variant="flat" @click="deleteSource(source)" icon="mdi-delete" />
        </span>
      </div>
    </v-list-item>
  </v-list>
</template>
