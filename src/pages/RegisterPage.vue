<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { router } from '@/router/router'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const name = ref('')
const error = ref('')
const submitting = ref(false)

function registerUser() {
  submitting.value = true

  authStore.register(email.value, password.value, name.value)
    .then(() => router.push({name: 'home'}))
    .catch(e => error.value = e.value)
    .finally(() => submitting.value = false)
}
</script>

<template>
  <form @submit.prevent="registerUser()">
    <v-card>
      <v-card-item>
        <v-card-title>Log in</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-text-field label="Your name" v-model="name" />
        <v-text-field type="email" label="Email address" v-model="email" />
        <v-text-field type="password" label="Password" v-model="password" />
        <p class="text-red-600 p-2" v-if="error">{{ error }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" text="Sign up" color="primary" variant="tonal" :disabled="submitting" />
      </v-card-actions>
    </v-card>
  </form>
</template>

<style scoped>

</style>