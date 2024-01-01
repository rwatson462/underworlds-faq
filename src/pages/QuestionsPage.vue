<script setup lang="ts">
import QuestionAnswer from "@/components/QuestionAnswer.vue";
import { useQuestionStore } from '@/stores/QuestionStore'
import Heading from '@/components/Heading.vue'

const questionStore = useQuestionStore()

</script>

<template>
  <Heading text="All Questions" />
  <section class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <QuestionAnswer v-for="(question, key) in questionStore.questions" :key="key"
        :question="question.question"
        :answer="question.answer"
        :source="question.source"
        :card="question.card"
        :tags="question.tags"
    />
  </section>
</template>
