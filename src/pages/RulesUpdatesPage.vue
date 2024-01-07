<script setup lang="ts">
const updates = [
  {
    where: 'Add the following to the advanced rules for Broken (pg 25)',

    new: 'Some older abilities tell you to discard an upgrade that has been \n' +
      'given to a fighter. This is the same as breaking that upgrade.',
    source: 'Rules Update, December 2023'
  },
  {
    where: 'Advanced rules: Who dealt damage?  Change the second bullet point to read (pg 23)',
    old: 'If a gambit spell or backlash (pg 28) deals damage, the\n' +
      'wizard that was casting the spell is said to have dealt\n' +
      'that damage and, if relevant, to have taken that fighter\n' +
      'out of action.',
    new: 'If a gambit spell or backlash (pg 37) deals damage, the wizard that\n' +
      'was casting the spell and that gambit are said to have dealt that\n' +
      'damage, and, if relevant, to have taken that fighter out of action.',
    source: 'Rules Update, December 2023'
  }
]
</script>

<template>
  <section class="space-y-4">
    <div
      class="border border-grey-500 rounded p-4 flex flex-col gap-4 shadow-md"
      v-for="(update,key) in updates" :key="key">
      <div>
        {{ update.where }}:
      </div>
      <div class="flex justify-between gap-4">
        <div v-if="update.old">
          <p class="font-semibold">OLD</p>
          <span class="text-gray-500">{{ update.old }}</span>
        </div>
        <div v-if="update.old" class="self-center">
          <v-icon icon="mdi-chevron-double-right" />
        </div>
        <div>
          <p v-if="update.old" class="font-semibold">NEW</p>
          {{ update.new }}
        </div>
      </div>

      <v-divider class="border-opacity-100" />

      <p class="text-sm bg-grey-50">
        Source: {{ update.source }}
      </p>
    </div>
  </section>
</template>
