<script setup lang="ts">
import { ref } from 'vue'
import { useTagStore } from '@/stores/TagStore'

const tagStore = useTagStore()

const newTag = ref('')
const saveError = ref('')
const loading = ref(false)
const showSnackbar = ref(false)
const filter = ref('')

function createTag() {
  loading.value = true
  saveError.value = ''

  tagStore
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
    <v-text-field v-model="newTag" label="Tag" class="mt-2" />
    <p class="text-red-500 font-semibold text-sm" v-if="saveError">{{ saveError }}</p>
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
          <v-btn size="small" variant="flat" @click="tagStore.deleteTag(tag)" icon="mdi-delete" />
        </span>
      </div>
    </v-list-item>
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