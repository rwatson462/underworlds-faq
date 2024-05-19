<script setup lang="ts">
import LatestUpdateItem from '@/components/HomePage/LatestUpdateItem.vue'

const news: {
  date: string;
  items: string[];
}[] = [
  {
    date: 'Thursday 16th May 2024',
    items: [
      'Updated the site with the ability to add Rules Errata',
      'We\'ll be updating the site over the coming days to add the rules changes',
    ]
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
]

</script>

<template>
  <section>
    <p class="px-2 py-2 text-lg font-semibold mb-4">
      Latest updates
    </p>
    <div v-for="(singleNews, key) of news" v-bind:key="key" class="mb-8">
      <LatestUpdateItem :date="singleNews.date" :items="singleNews.items" />
    </div>
  </section>
</template>
