<script setup lang="ts">
import { useSnackbarStore } from '@/stores/SnackbarStore'

const snackbarStore = useSnackbarStore()

</script>

<template>
  <v-snackbar :model-value="snackbarStore.show" location="bottom right" :timeout="2000"
    @update:modelValue="snackbarStore.hide()" :color="snackbarStore.color">
    {{ snackbarStore.text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbarStore.hide()" icon="mdi-close" />
    </template>
  </v-snackbar>
</template>
