<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import Heading from '@/components/Heading.vue'
import { ref } from 'vue'

const authStore = useAuthStore()

const loading = ref(false)
const newPassword = ref('')
const passwordError = ref('')
const showSnackbar = ref(false)

function changePassword() {
  loading.value = true
  passwordError.value = ''

  authStore
    .changePassword(newPassword.value)
    .then(() => showSnackbar.value = true)
    .catch((error: string) => passwordError.value = error)
    .finally(() => loading.value = false)
}

// Satisfy Typescript that the user does exist
// Also shortcut so we don't have to type `authStore.user` each time
const user = authStore.user!
</script>

<template>
  <Heading text="Your profile" />
  <p>Name: {{ user.user_metadata.name }}</p>
  <p>Email: {{ user.email }}</p>

  <section class="py-4">
    <Heading text="Change password" />
    <form @submit.prevent="changePassword()">
      <v-text-field v-model="newPassword" label="New password" type="password" :disabled="loading" />
      <p class="text-red-500 text-sm" v-if="passwordError">{{ passwordError }}</p>
      <v-btn type="submit" text="Change password" color="primary" />
    </form>
  </section>

  <v-snackbar v-model="showSnackbar" color="primary" location="bottom right" :timeout="2000">
    Password changed successfully
  </v-snackbar>
</template>
