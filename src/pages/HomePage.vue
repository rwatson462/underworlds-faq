<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'

const randomQuestion = {
  question: 'When a rule refers to an activation, is that the same thing as an activation step?',
  answer: 'Yes',
  sources: [
    'FAQ',
  ]
}
</script>

<template>
    <p>Welcome to Underworlds FAQ, an easy-to-use FAQ space for Warhammer Underworlds by Games Workshop.</p>
    <p>Up to date including the latest Designer's Commentary and Rules updates from December 2023.</p>

    <QuestionAnswer
      :question="randomQuestion.question"
      :answer="randomQuestion.answer"
      :sources="randomQuestion.sources"
    />
</template>

<style scoped>
  .v-card .question {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }

  .v-card .v-card-subtitle {
    margin: 0.5rem 0
  }
</style>