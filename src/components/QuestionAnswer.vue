<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps([
    'question',
    'answer',
    'source',
    'cards',
    'tags',
    'search',
  ])

  // todo highlight words search for
  // const searchWords = computed(() => props.search.split(' ').filter((s: string) => s.length > 0))
</script>

<template>
  <v-card variant="tonal" class="m-4">
    <v-card-text class="flex gap-2 items-center">
      <v-icon icon="mdi-chat-question-outline" />
      {{ props.question }}
    </v-card-text>
    <v-card-text class="whitespace-break-spaces">
      A: {{ props.answer }}
    </v-card-text>
    <v-card-text class="flex gap-2 flex-wrap" v-if="cards?.length || tags?.length">
      <VChip size="small" v-for="(card,key) in cards" :key="key" :text="card" variant="flat" />
      <VChip size="small" v-for="(tag,key) in tags" :key="key" :text="tag" variant="tonal" />
    </v-card-text>
    <v-card-text class="text-sm bg-grey-50">
      Source: {{ source }}
    </v-card-text>
  </v-card>
</template>
