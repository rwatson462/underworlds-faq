<script setup lang="ts">
defineProps<{
  to: string | {name: string, params: Record<string, string>};
  text: string;
}>()
</script>

<template>
  <router-link :to="to" class="underline font-semibold text-sky-600 hover:text-pink-600 transition-colors">
    {{ text }}
  </router-link>
</template>
