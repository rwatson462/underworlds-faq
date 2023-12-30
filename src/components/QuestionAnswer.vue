<script setup lang="ts">
  const props = defineProps([
    'question',
    'answer',
    'sources',
  ])
</script>

<template>
  <v-card elevation="0" variant="tonal">
    <v-card-text class="question">
      <v-icon icon="mdi-chat-question-outline" />
      {{ props.question }}
    </v-card-text>
    <v-card-text class="answer">
      A: {{ props.answer }}
    </v-card-text>
    <v-card-text class="sources">
      <VChip v-for="(source, key) in props.sources" :text="source" :key="key" variant="flat" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .v-card {
    margin: 1rem;
  }

  .v-card-text.sources {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
</style>