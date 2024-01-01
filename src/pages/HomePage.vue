<script setup lang="ts">
import QuestionAnswer from '@/components/QuestionAnswer.vue'
import ExternalLink from '@/components/ExternalLink.vue'
import Heading from '@/components/Heading.vue'
import InternalLink from '@/components/InternalLink.vue'
import { route } from '@/helpers/route'

const randomQuestion = {
  question: 'Can Ghartok be driven back?',
  answer: 'No',
  source: 'It is written on his card',
  tags: ['Magore\'s Fiends']
}

</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <Heading text="Welcome to Underworlds FAQ" />
      <p>
        Underworlds FAQ is an easy-to-use FAQ presentation for Warhammer Underworlds by Games Workshop, released
        January 1st 2024 and contains Designer's Commentary and Rules updates from December 2023.
      </p>
      <p>
        <InternalLink :to="route('questions')" text="Get started here" />
      </p>
      <p>
        Something to note: Currently this app is up to date with FAQ entries for the Current Season and about half of
        the Previous Season.  I'll be adding the rest over the next few days.
      </p>
    </section>

    <section>
      <p>Here's an inside joke question, but you can see how the entries are formatted:</p>
      <section class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <QuestionAnswer
          :question="randomQuestion.question"
          :answer="randomQuestion.answer"
          :source="randomQuestion.source"
          :tags="randomQuestion.tags"
        />
      </section>
    </section>

    <section>
      <p>Sources:</p>
      <ul class="list-disc list-inside">
        <li>
          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/3o0MaTmdQ3vUgqYa.pdf"
                        text="Rules Update, December 2023" />
          (pdf)
        </li>
        <li>
          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/nC1X3OxTXkVbNMPj.pdf"
                        text="Designer's Commentary, December 2023" />
          (pdf)
        </li>
        <li>
          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/qLeKiJExZOaKQvYZ.pdf"
                        text="Previous Seasons Designer’s Commentary, December 2023" />
          (pdf)
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>

</style>