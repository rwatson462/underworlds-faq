<script setup lang="ts">
const {to, text} = defineProps<{
  text: string;
  to: string;
}>()
</script>

<template>
  <a :href="to" target="_blank" rel="noopener" class="underline font-semibold text-sky-600 hover:text-pink-600 transition-colors">{{ text }}</a>
</template>
