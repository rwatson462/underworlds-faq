<script setup lang="ts">
import Heading from '@/components/Heading.vue'
import InternalLink from '@/components/InternalLink.vue'
import { route } from '@/helpers/route'
import Sources from '@/components/HomePage/Sources.vue'
import { useFeature } from '@/helpers/useFeature'
import News from '@/components/HomePage/News.vue'

const rulesFeatureEnabled = useFeature('rules')

</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <Heading text="Welcome to Underworlds FAQ" />
      <p>
        Underworlds FAQ is an easy-to-use presentation of the Frequently Asked Questions and Designer's Commentary
        for Warhammer Underworlds by Games Workshop, updated frequently throughout the year.
      </p>
      <div class="flex">
        <div class="text-lg rounded-lg shadow border px-6 py-4 hover:bg-pink-50 relative">
          👋&nbsp;
          <InternalLink :to="route('questions')" text="FAQs: Get started here" />
          <router-link :to="route('questions')" class="absolute inset-0" />
        </div>
      </div>
      <p v-if="rulesFeatureEnabled">
        <InternalLink :to="route('rules-updates')" text="Rules updates" />
      </p>
    </section>
    <News />
    <Sources />
  </div>
</template>
