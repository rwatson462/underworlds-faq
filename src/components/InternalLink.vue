<script setup lang="ts">
defineProps([
  'to',
  'text',
])
</script>

<template>
  <router-link :to="to" v-text="text" class="underline font-semibold text-sky-600 hover:text-pink-600 transition-colors" />
</template>
