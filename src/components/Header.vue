<script setup lang="ts">
import { route } from '@/helpers/route.js'
import { useAuthStore } from '@/stores/AuthStore'
import InternalLink from '@/components/InternalLink.vue'

const authStore = useAuthStore()

function logout() {
  authStore.logout()
    .then(() => location.reload())
}
</script>

<template>
  <v-app-bar>
    <v-app-bar-title><InternalLink :to="route('home')" text="Underworlds FAQ" /></v-app-bar-title>
    <template v-slot:append>
      <div class="flex gap-2 items-center">
      <v-btn v-if="!authStore.isLoggedIn" text="Log in" :to="route('login')" />
      <v-btn v-if="authStore.isLoggedIn" text="Manage" :to="route('manage')" />
      <v-btn v-if="authStore.isLoggedIn" icon="mdi-account-circle" title="Your profile" :to="route('profile')" />
      <v-btn v-if="authStore.isLoggedIn" title="Log out" @click="logout()" icon="mdi-logout" />
      </div>
    </template>
  </v-app-bar>
</template>
