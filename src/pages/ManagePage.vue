<script setup lang="ts">
import Heading from '@/components/Heading.vue'
import SourceTab from '@/components/ManageQuestions/SourceTab.vue'
import NewQuestionTab from '@/components/ManageQuestions/NewQuestionTab.vue'
import { ref } from 'vue'
import TagTab from '@/components/ManageQuestions/TagTab.vue'
import CardTab from '@/components/ManageQuestions/CardTab.vue'
import QuestionsTab from '@/components/ManageQuestions/QuestionsTab.vue'
import RulesTab from '@/components/RulesTab.vue'
import { useFeature } from '@/helpers/useFeature'

const rulesFeatureEnabled = useFeature('rules')

const tab = ref('new-question')
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading text="Manage questions" />
    <v-tabs v-model="tab">
      <v-tab value="new-question">New Question</v-tab>
      <v-tab value="cards">Cards</v-tab>
      <v-tab value="sources">Sources</v-tab>
      <v-tab value="tags">Tags</v-tab>
      <v-tab value="questions">Questions</v-tab>
      <v-tab value="rules" v-if="rulesFeatureEnabled">Rules Updates</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="new-question">
        <NewQuestionTab />
      </v-window-item>
      <v-window-item value="cards">
        <CardTab />
      </v-window-item>
      <v-window-item value="sources">
        <SourceTab />
      </v-window-item>
      <v-window-item value="tags">
        <TagTab />
      </v-window-item>
      <v-window-item value="questions">
        <QuestionsTab />
      </v-window-item>
      <v-window-item value="rules" v-if="rulesFeatureEnabled">
        <RulesTab />
      </v-window-item>
    </v-window>
  </div>
</template>
