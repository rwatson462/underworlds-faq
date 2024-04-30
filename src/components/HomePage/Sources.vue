<script setup lang="ts">
import Source from '@/components/HomePage/Source.vue'
import { useFeature } from '@/helpers/useFeature'

const rulesFeatureEnabled = useFeature('rules')

const sources: {
  url: string;
  text: string;
  type: string;
  enabled: boolean;
}[] = [
  {
    url: 'https://www.warhammer-community.com/wp-content/uploads/2024/04/r7Rd01u0gFZIBB5p.pdf',
    text: "Designer's Commentary, April 2024",
    type: 'pdf',
    enabled: true,
  },
  {
    url: 'https://www.warhammer-community.com/wp-content/uploads/2022/10/LUmeu2OhrUc9PaQn.pdf',
    text: "Previous Seasons Designer's Commentary",
    type: 'pdf',
    enabled: true,
  },
  {
    url: 'https://www.warhammer-community.com/wp-content/uploads/2022/10/3o0MaTmdQ3vUgqYa.pdf',
    text: 'Rules Update, December 2023',
    type: 'pdf',
    enabled: rulesFeatureEnabled,
  },
  {
    url: 'https://www.warhammer-community.com/wp-content/uploads/2022/10/nC1X3OxTXkVbNMPj.pdf',
    text: "Designer's Commentary, December 2023",
    type: 'pdf',
    enabled: true,
  },
  {
    url: 'https://www.warhammer-community.com/wp-content/uploads/2022/10/qLeKiJExZOaKQvYZ.pdf',
    text: 'Previous Seasons Designer’s Commentary, December 2023',
    type: 'pdf',
    enabled: true,
  },
].filter(source => source.enabled)
</script>

<template>
  <section>
    <p>Sources:</p>
    <ul class="list-disc list-inside">
      <Source v-for="(source, key) of sources" v-bind:key="key" :url="source.url" :text="source.text" :type="source.type" />
    </ul>
  </section>
</template>
