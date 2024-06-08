<script setup lang="ts">
defineProps<{
  text: string;
}>()
</script>

<template>
  <h1 class="text-3xl font-bold pb-4">{{ text }}</h1>
</template>
