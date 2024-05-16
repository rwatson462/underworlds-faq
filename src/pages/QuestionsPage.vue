<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import { useQuestionStore } from '@/stores/QuestionStore'
import Heading from '@/components/Heading.vue'
import { computed, ref } from 'vue'

const questionStore = useQuestionStore()

const search = ref('')

const filtered = computed(() => questionStore.searchQuestions(search.value))

// todo: implement this somehow
// function debounce(callback: (...args: any[]) => void, delay: number) {
//   let timeout: number;
//
//   return function(...args: any[]) {
//     window.clearTimeout(timeout)
//     timeout = window.setTimeout(() => callback(...args), delay)
//   }
// }

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

  <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
    <QuestionAnswer v-for="(question, key) in filtered" :key="key"
      :question="question.question"
      :answer="question.answer"
      :entry_type="question.entry_type"
      :source="question.source"
      :cards="question.cards"
      :tags="question.tags"
      :search="search"
    />
  </section>
</template>
