import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question } from '@/types'
import { supabaseClient } from '@/helpers/supabaseClient'

export const useQuestionStore = defineStore(
  'question',
  () => {
    const sources = ref<string[]>([])
    const tags = ref<string[]>([])
    const cards = ref<string[]>([])
    const questions = ref<Question[]>([])

    const supabase = supabaseClient()

    loadSources()
    loadQuestions()
    loadTags()
    loadCards()

    async function loadSources() {
      supabase
        .from('question_sources')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          sources.value = data.map(source => source.name).sort()
        })
    }

    async function loadTags() {
      supabase
        .from('tags')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          tags.value = data.map(tag => tag.name).sort()
        })
    }

    async function loadCards() {
      supabase
        .from('cards')
        .select('name')
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          cards.value = data.map(card => card.name).sort()
        })
    }

    async function loadQuestions() {
      supabase
        .from('compiled_questions')
        .select()
        .then(({ data, error }) => {
          if (error) {
            throw new Error(error.message)
          }

          questions.value = data.map((question): Question => ({
            question: question.question,
            answer: question.answer,
            source: question.source,
            cards: JSON.parse(question.cards),
            tags: JSON.parse(question.tags),
          }))
        })
    }

    async function createSource(source: string) {
      return supabase
        .from('question_sources')
        .insert({
          name: source
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadSources()
        })
    }

    async function createTag(tag: string) {
      return supabase
        .from('tags')
        .insert({
          name: tag
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadTags()
        })
    }

    async function createCard(card: string) {
      return supabase
        .from('cards')
        .insert({
          name: card
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadCards()
        })
    }

    async function createQuestion(question: string, answer: string, source: string, cards: string[]|null = null, tags: string[] | null = null) {
      return await supabase
        .from('compiled_questions')
        .insert({
          question,
          answer,
          source,
          cards: JSON.stringify(cards),
          tags: JSON.stringify(tags),
        })
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadQuestions()
      })
    }

    async function deleteQuestion(question: string) {
      return supabase
        .from('compiled_questions')
        .delete()
        .eq('question', question)
        .then(({ error }) => {
          if (error) {
            throw new Error(error.message)
          }

          loadQuestions()
        })
    }
    return {
      sources,
      questions,
      cards,
      tags,
      createSource,
      createQuestion,
      createTag,
      createCard,
      deleteQuestion,
    }
  }
)