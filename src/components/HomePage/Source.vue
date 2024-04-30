<script setup lang="ts">
import ExternalLink from '@/components/ExternalLink.vue'

defineProps<{
  url: string;
  text: string;
  type: string;
}>()
</script>

<template>
  <li>
    <ExternalLink :to="url"
                  :text="text" />
    ({{ type }})
  </li>
</template>
