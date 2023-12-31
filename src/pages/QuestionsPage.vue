<script setup lang="ts">
import QuestionAnswer from "@/components/QuestionAnswer.vue";
import {ref} from "vue";
import {supabaseClient} from "@/helpers/supabaseClient";
import type { Question } from '@/types'


const error = ref('')
const questions = ref<Question[]>([])

supabaseClient()
    .from('compiled_questions')
    .select()
    .then(({data, error: err}) => {
      if (err) {
        error.value = err.message
        return
      }

      console.log(data)
      questions.value = data
    })

</script>

<template>
  <h1 class="text-2xl font-semibold">All Questions</h1>
  <p v-if="error" class="text-red-500">{{ error }}</p>
  <section class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <QuestionAnswer v-for="(question, key) in questions" :key="key"
        :question="question.question"
        :answer="question.answer"
        :sources="question.source"
    />
  </section>
</template>
