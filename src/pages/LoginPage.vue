<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'
import { router } from '@/router/router'
import Heading from '@/components/Heading.vue'
import { track } from '@vercel/analytics'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

function login() {
  submitting.value = true
  error.value = ''

  authStore.login(email.value, password.value)
    .then(() => {
      email.value = ''
      password.value = ''
      router.push({ name: 'home' })
    })
    .catch((e) => {
      error.value = e.message
    })
    .finally(() => submitting.value = false)
}
</script>

<template>
    <Heading text="Log in" />
    <form @submit.prevent="login()">
      <v-text-field type="email" label="Email address" v-model="email" class="mt-2" />
      <v-text-field type="password" label="Password" v-model="password" class="mt-2" />
      <p class="text-red-600 p-2" v-if="error">{{ error }}</p>
      <v-btn type="submit" color="primary" variant="tonal" text="Log in" :disabled="submitting" />
    </form>

</template>
