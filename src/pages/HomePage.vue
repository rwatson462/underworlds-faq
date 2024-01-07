<script setup lang="ts">
import ExternalLink from '@/components/ExternalLink.vue'
import Heading from '@/components/Heading.vue'
import InternalLink from '@/components/InternalLink.vue'
import { route } from '@/helpers/route'
</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <Heading text="Welcome to Underworlds FAQ" />
      <p>
        Underworlds FAQ is an easy-to-use FAQ presentation for Warhammer Underworlds by Games Workshop, released
        January 1st 2024 and contains Designer's Commentary from December 2023.
      </p>
      <p>
        <InternalLink :to="route('questions')" text="Get started here" />
      </p>
    </section>

    <section class="space-y-4">
      <p class="px-2 py-2 text-lg font-semibold">
        Latest updates
      </p>
      <div>
        <p>
          <span class="rounded-r px-2 py-1 bg-sky-400 text-white">
            Saturday 6th January 2024
          </span>
        </p>
        <ul class="list-disc list-outside pl-6 py-1">
          <li>Added questions up to page 16 of Previous Seasons Designer's Commentary</li>
          <li>Added this section where I can share latest updates 😀</li>
          <li>Updated the view of questions to hopefully make them clearer and less dull/grey</li>
        </ul>
      </div>
      <div>
        <p>
          <span class="rounded-r px-2 py-1 bg-sky-400 text-white">
            Monday 1st January 2024
          </span>
        </p>
        <ul class="list-disc list-outside pl-6 py-1">
          <li>Initial launch!</li>
          <li>Included all questions from Current Season Designer's Commentary</li>
          <li>Included pages 1-5 of Previous Seasons Designer's Commentary</li>
        </ul>
      </div>
    </section>

    <section>
      <p>Sources:</p>
      <ul class="list-disc list-inside">
<!--        <li>-->
<!--          <ExternalLink to="https://www.warhammer-community.com/wp-content/uploads/2022/10/3o0MaTmdQ3vUgqYa.pdf"-->
<!--                        text="Rules Update, December 2023" />-->
<!--          (pdf)-->
<!--        </li>-->
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
