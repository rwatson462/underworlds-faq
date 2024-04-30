<script setup lang="ts">
import LatestUpdateItem from '@/components/HomePage/LatestUpdateItem.vue'
import { useFeature } from '@/helpers/useFeature'

const rulesFeatureEnabled = useFeature('rules')

const news: {
  date: string;
  items: string[];
  show?: boolean;
}[] = [
  {
    date: 'xxx',
    items: [
      'Added Rules updates from December 2023',
      'Added Rules updates from January 2024',
    ],
    show: rulesFeatureEnabled,
  },
  {
    date: 'Tuesday 30th April 2024',
    items: [
      "Added all new FAQ questions from latest Designer's Commentary",
      "Added all new FAQ questions from latest Previous Designer's Commentary"
    ]
  },
  {
    date: 'Sunday 7th January 2024',
    items: [
      "Added the rest of the questions from Previous Seasons Designer's Commentary",
      "Lots of behind the scenes work so I can update entries easily",
      "Acquired all previous FAQ documents so will start merging those in soon",
    ]
  },
  {
    date: 'Saturday 6th January 2024',
    items: [
      "Added questions up to page 16 of Previous Seasons Designer's Commentary",
      "Added this section where I can share latest updates 😀",
      "Updated the view of questions to hopefully make them clearer and less dull/grey",
    ],
  },
  {
    date: 'Monday 1st January 2024',
    items: [
      "Initial launch!",
      "Included all questions from Current Season Designer's Commentary",
      "Included pages 1-5 of Previous Seasons Designer's Commentary",
    ]
  }
].filter(news => news.show ?? true)

</script>

<template>
  <section class="space-y-4">
    <p class="px-2 py-2 text-lg font-semibold">
      Latest updates
    </p>
    <div v-for="(singleNews, key) of news" v-bind:key="key">
      <LatestUpdateItem :date="singleNews.date" :items="singleNews.items" />
    </div>
  </section>
</template>
