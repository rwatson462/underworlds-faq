<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <v-sheet>
        <RouterView />
      </v-sheet>
    </v-main>

    <Footer />
  </v-app>
</template>

<style scoped>
  .v-sheet {
    padding: 1rem;
  }
</style>