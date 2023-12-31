<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import ExternalLink from '@/components/ExternalLink.vue'
import Heading from '@/components/Heading.vue'

const randomQuestion = {
  question: 'When a rule refers to an activation, is that the same thing as an activation step?',
  answer: 'Yes',
  sources: [
    'FAQ'
  ]
}

</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <Heading text="Welcome to Underworlds FAQ" />
      <p>Underworlds FAQ is an easy-to-use FAQ space for Warhammer Underworlds by Games Workshop.</p>
      <p>Released December 31st 2023 and contains Designer's Commentary and Rules updates from December 2023.</p>
    </section>

    <section>
      <p>Here's a random question:</p>
      <section class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <QuestionAnswer
          :question="randomQuestion.question"
          :answer="randomQuestion.answer"
          :sources="randomQuestion.sources"
        />
      </section>
    </section>

    <section>
      <p>Sources:</p>
      <ul class="list-disc list-inside">
        <li>
          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/3o0MaTmdQ3vUgqYa.pdf"
                        text="Rules Update, December 2023" />
        </li>
        <li>
          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/nC1X3OxTXkVbNMPj.pdf"
                        text="Designer's Commentary, December 2023" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>