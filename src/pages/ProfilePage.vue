<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

// Satisfy Typescript that the user does exist
// Also shortcut so we don't have to type `authStore.user` each time
const user = authStore.user!
</script>

<template>
  <v-card variant="flat">
    <v-card-item>
      <v-card-title>Your profile</v-card-title>
    </v-card-item>
    <v-card-item>
      <v-card-text>Name: {{ user.user_metadata.name}}</v-card-text>
      <v-card-text>Email: {{ user.email }}</v-card-text>
      <v-card-text>Confirmed: {{ user.email_confirmed_at ? 'Yes' : 'No' }}</v-card-text>
    </v-card-item>
  </v-card>
</template>
