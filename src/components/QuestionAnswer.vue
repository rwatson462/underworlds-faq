<script setup lang="ts">
  const props = defineProps([
    'question',
    'answer',
    'source',
    'card',
    'tags',
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
      <VChip size="small" :text="source" variant="flat" />
    </v-card-text>
    <v-card-text v-if="card" :text="card" />
    <v-card-text class="flex gap-4 p-4" v-if="tags">
      <VChip size="small" v-for="(tag,key) in tags" :key="key" :text="tag" variant="tonal" />
    </v-card-text>
  </v-card>
</template>
