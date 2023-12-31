<script setup lang="ts">
  const props = defineProps([
    'question',
    'answer',
    'sources',
  ])
</script>

<template>
  <v-card variant="tonal" class="m-4">
    <v-card-text class="flex gap-2 items-center m-0">
      <v-icon icon="mdi-chat-question-outline" />
      {{ props.question }}
    </v-card-text>
    <v-card-text class="answer">
      A: {{ props.answer }}
    </v-card-text>
    <v-card-text class="flex gap-4 p-4">
      <VChip size="small" v-for="(source, key) in props.sources" :text="source" :key="key" variant="flat" />
    </v-card-text>
  </v-card>
</template>
