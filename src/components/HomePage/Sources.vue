<script setup lang="ts">
import ExternalLink from '@/components/ExternalLink.vue'
import { useFeature } from '@/helpers/useFeature'

const rulesFeatureEnabled = useFeature('rules')
</script>

<template>
  <section>
    <p>Sources:</p>
    <ul class="list-disc list-inside">
      <li v-if="rulesFeatureEnabled">
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
</template>
