<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import Heading from '@/components/Heading.vue'

const authStore = useAuthStore()

// Satisfy Typescript that the user does exist
// Also shortcut so we don't have to type `authStore.user` each time
const user = authStore.user!
</script>

<template>
  <Heading text="Your profile" />
  <p>Name: {{ user.user_metadata.name }}</p>
  <p>Email: {{ user.email }}</p>
</template>
