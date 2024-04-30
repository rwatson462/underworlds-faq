<script setup lang="ts">
  const props = defineProps<{
    date: string;
    items: string[];
  }>()
</script>

<template>
  <div>
    <p>
      <span class="rounded px-2 py-1 bg-sky-400 text-white">
        {{props.date}}
      </span>
    </p>
    <ul class="list-disc list-outside pl-6 py-1">
      <li v-for="(item, key) of items" v-bind:key="key">{{ item }}</li>
    </ul>
  </div>
</template>
