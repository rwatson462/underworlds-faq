<script setup lang="ts">
import Heading from '@/components/Heading.vue'
import InternalLink from '@/components/InternalLink.vue'
import { route } from '@/helpers/route'
import Sources from '@/components/HomePage/Sources.vue'
import News from '@/components/HomePage/News.vue'
import ExternalLink from '@/components/ExternalLink.vue'
</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="flex flex-col gap-4">
      <Heading text="Welcome to Underworlds FAQ" />
      <p>
        Underworlds FAQ is an easy-to-use presentation of the Frequently Asked Questions and Designer's Commentary
        for Warhammer Underworlds by Games Workshop, updated frequently throughout the year.
      </p>
      <div>
        <h4 class="text-lg font-semibold">Update on the new edition</h4>
        <p>Underworlds 2nd edition (that's what I'm calling it) has been announced!  What does that mean for this site?</p>
        <p>
          It means all the content on here as it stands is old, deprecated, no-longer-relevant.
          But I'll still keep it around for people playing 1st edition still.
          When the new edition is released, I'll move all the current content into a side space looking exactly like it does now.
          Then I'll have to think about what content and format to have for the new edition.
          Presumably Games Workshop will keep their current form of releasing FAQs and Errata with the new edition, in which case this site still has purpose.
        </p>
      </div>

      <hr>

      <div class="flex">
        <div class="transition-colors text-lg rounded-lg shadow border px-6 py-4 hover:bg-pink-50 relative">
          👋&nbsp;
          <InternalLink :to="route('questions')" text="FAQs: Get started here" />
          <router-link :to="route('questions')" class="absolute inset-0" />
        </div>
      </div>
      <p>
        Go build your deck on <ExternalLink to="https://www.underworldsdb.com" text="UnderworldsDB" />!
      </p>
    </section>
    <News />
    <Sources />
  </div>
</template>
