<script setup lang="ts">
  import type { Question } from '@/types'
  import { computed } from 'vue'

  const props = defineProps<Question>()

  const entryType = computed(() => props.entry_type === 'faq' ? 'FAQ' : 'Rules Errata')

  // todo highlight words search for
  // const searchWords = computed(() => props.search.split(' ').filter((s: string) => s.length > 0))
</script>

<template>
  <div class="border border-grey-500 rounded p-4 flex flex-col gap-4 shadow-md">
    <span class="-ml-4 -mt-4 self-start text-sm px-2 py-1 rounded-br bg-slate-300 text-slate-700">{{ entryType }}</span>
    <p><span v-if="props.entry_type === 'faq'">Q: </span>{{ props.question }}</p>

    <p v-if="props.entry_type === 'faq'">
      A: <span class="whitespace-break-spaces">{{ props.answer }}</span>
    </p>

    <p class="flex-grow"></p>
    <v-divider class="invisible md:visible border-opacity-100" />

    <p class="flex gap-2 flex-wrap" v-if="cards?.length || tags?.length">
      <VChip size="small" v-for="(card,key) in cards" :key="key" :text="card" variant="flat" />
      <VChip size="small" v-for="(tag,key) in tags" :key="key" :text="tag" variant="tonal" />
    </p>

    <p class="text-sm bg-grey-50">
      Source: {{ source }}
    </p>
  </div>
</template>
