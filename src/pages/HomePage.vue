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
        Underworlds FAQ is an easy-to-use FAQ presentation for Warhammer Underworlds by Games Workshop, released
        January 1st 2024 and contains Designer's Commentary from December 2023.
      </p>
      <p>
        <InternalLink :to="route('questions')" text="FAQs: Get started here" />
      </p>
      <p v-if="rulesFeatureEnabled">
        <InternalLink :to="route('rules-updates')" text="Rules updates" />
      </p>
    </section>
    <News />
    <Sources />
  </div>
</template>
