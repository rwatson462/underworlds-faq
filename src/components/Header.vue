<template>
  <v-app-bar>
    <v-app-bar-title>Searchable Underworlds FAQ</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-account-circle" title="Log in" :to="route('login')" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { route } from '@/helpers/route.js'
</script>