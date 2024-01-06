<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import { useQuestionStore } from '@/stores/QuestionStore'
import Heading from '@/components/Heading.vue'
import { computed, ref, watch } from 'vue'
import { track } from '@vercel/analytics'

const questionStore = useQuestionStore()

const search = ref('')

const filtered = computed(() => questionStore.questions.filter(({ question, answer, cards, tags }) => {
  // If nothing but whitespace is in the search box, return all results
  if (search.value.trim() === '') {
    return true
  }

  // Break down the search into words then check for each word in the questions
  const words = search.value.trim().split(' ').map(s => s.trim()).filter(s => s.length > 0).map(s => s.toLowerCase())

  const matches = words.filter(word => {
    if (question.toLowerCase().includes(word)) {
      return true
    }

    if (answer.toLowerCase().includes(word)) {
      return true
    }

    for (const card of cards ?? []) {
      if (card.toLowerCase().includes(word)) {
        return true
      }
    }

    for (const tag of tags ?? []) {
      if (tag.toLowerCase().includes(word)) {
        return true
      }
    }

    return false
  })

  return matches.length === words.length
}))

function debounce(callback: (...args: any[]) => void, delay: number) {
  let timeout: number;

  return function(...args: any[]) {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => callback(...args), delay)
  }
}

watch(search, debounce((query: string) => {
  track('search', { query })
}, 3000))

</script>

<template>
  <Heading text="All Questions" />

  <section class="flex flex-col gap-4 pb-4">
    <p>Found {{ filtered.length }} question{{ filtered.length !== 1 ? 's' : ''}}</p>
    <div>
    <v-text-field v-model="search" label="Search" />
    <p class="text-sm text-gray-500">
      This searches the Question, Answer, any Cards linked, and Tags.
      Only results containing all given words are shown.
    </p>
    </div>
  </section>

  <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <QuestionAnswer v-for="(question, key) in filtered" :key="key"
                    :question="question.question"
                    :answer="question.answer"
                    :source="question.source"
                    :cards="question.cards"
                    :tags="question.tags"
                    :search="search"
    />
  </section>
</template>
