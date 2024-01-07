<script setup lang="ts">
import { ref } from 'vue'
import { useTagStore } from '@/stores/TagStore'
import { useSnackbarStore } from '@/stores/SnackbarStore'

const tagStore = useTagStore()
const snackbarStore = useSnackbarStore()

const newTag = ref('')
const saveError = ref('')
const loading = ref(false)
const filter = ref('')

function createTag() {
  loading.value = true
  saveError.value = ''

  // Quick check if the card already exists
  if (tagStore.tags.filter(tag => tag === newTag.value).length > 0) {
    saveError.value = 'The tag [' + newTag.value + '] already exists'
    loading.value = false
    return
  }

  tagStore
    .createTag(newTag.value)
    .then(() => {
      newTag.value = ''
      snackbarStore.trigger({ text: 'New tag created!' })
    })
    .catch((err: string) => saveError.value = err)
    .finally(() => loading.value = false)
}

function deleteTag(tag: string) {
  tagStore
    .deleteTag(tag)
    .then(() => snackbarStore.trigger({ text: 'Tag [' + tag + '] deleted', color: 'error'}))
}
</script>

<template>
  <form @submit.prevent="createTag()">
    <v-text-field v-model="newTag" label="Tag" class="mt-2" />
    <p class="text-red-500 font-semibold text-sm my-4" v-if="saveError">{{ saveError }}</p>
    <v-btn type="submit" color="primary" text="Create Tag" :disabled="loading" />
  </form>
  <v-list>
    <v-list-subheader>Existing Tags</v-list-subheader>
    <v-list-item>
      <v-text-field v-model="filter" label="Search tags" class="mt-2" />
    </v-list-item>
    <v-list-item
      v-for="(tag, key) in tagStore.tags.filter(c => c.toLowerCase().includes(filter.toLowerCase()))"
      :key="key"
      class="hover:bg-gray-100"
    >
      <div class="flex justify-between items-center">
        <span class="flex-grow">{{ tag }}</span>
        <span>
          <v-btn size="small" variant="flat" @click="deleteTag(tag)" icon="mdi-delete" />
        </span>
      </div>
    </v-list-item>
  </v-list>
</template>
