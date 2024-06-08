<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import { useQuestionStore } from '@/stores/QuestionStore'
import Heading from '@/components/Heading.vue'
import { computed, ref } from 'vue'

type QuestionFilter = 'faq' | 'errata' | 'all';

const questionStore = useQuestionStore()

const search = ref('')
const filter = ref<QuestionFilter>('all')

const filtered = computed(() => questionStore.searchQuestions(search.value, filter.value))

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
  <div class="flex gap-6 items-start pb-4">
    <div class="flex flex-column">
      <Heading text="All Questions" />
      <p>Found {{ filtered.length }} question{{ filtered.length !== 1 ? 's' : '' }}</p>
    </div>
    <div class="flex gap-2 items-center rounded border border-slate-300 p-2">
      <p class="px-4 font-semibold">Filters:</p>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <button
            class="rounded bg-slate-200 hover:bg-slate-300 shadow text-slate-900 px-2 py-1"
            :class="filter === 'faq' ? 'bg-sky-300' : ''"
            type="button"
            @click="filter = 'faq'"
          >FAQs
          </button>
          <button
            class="rounded bg-slate-200 hover:bg-slate-300 shadow text-slate-900 px-2 py-1"
            :class="filter === 'errata' ? 'bg-sky-300' : ''"
            type="button"
            @click="filter = 'errata'">Rules Errata
          </button>
        </div>
        <button
          class="rounded bg-slate-200 hover:bg-slate-300 shadow text-slate-900 px-2 py-1"
          :class="filter === 'all' ? 'bg-sky-300' : ''"
          type="button"
          @click="filter = 'all'">Both
        </button>
      </div>
    </div>
  </div>

  <section class="flex flex-col gap-4 pb-4">

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
