<script setup lang="ts">
import type { RouteName } from '@/router/routes'
import { route } from '@/helpers/route'

defineProps<{
  to: RouteName | ReturnType<typeof route>;
  text: string;
}>()
</script>

<template>
  <router-link :to="to" class="underline font-semibold text-sky-600 hover:text-pink-600 transition-colors">
    {{ text }}
  </router-link>
</template>
