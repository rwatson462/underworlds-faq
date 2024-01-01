<script setup lang="ts">
import Heading from '@/components/Heading.vue'
import CreateSourceForm from '@/components/CreateSourceForm.vue'
import CreateQuestionForm from '@/components/CreateQuestionForm.vue'
import { ref } from 'vue'
import CreateTagForm from '@/components/CreateTagForm.vue'

const tab = ref('questions')
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading text="Manage questions" />
    <v-tabs v-model="tab">
      <v-tab value="questions">Questions</v-tab>
      <v-tab value="sources">Sources</v-tab>
      <v-tab value="tags">Tags</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="questions">
        <CreateQuestionForm />
      </v-window-item>
      <v-window-item value="sources">
        <CreateSourceForm />
      </v-window-item>
      <v-window-item value="tags">
        <CreateTagForm />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>

</style>