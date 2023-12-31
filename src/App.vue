<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <v-app>
    <Header />

    <v-main class="bg-gradient-to-br from-orange-300 to-pink-400">
      <v-sheet class="m-1 md:m-4 lg:m-8 p-4" elevation="2" rounded>
        <RouterView />
      </v-sheet>
    </v-main>

    <Footer />
  </v-app>
</template>
