<script lang="ts" setup>
import loaderIcon from '@/assets/icons/arrow-path.svg?raw'
const { type, textBtn, textAria } = defineProps<{ type: string, textBtn: string, textAria: string }>();
</script>

<template>
  <button v-if="type === 'primary'"
    class="text-white flex gap-1 font-bold w-full justify-center bg-primary-700 rounded-lg text-sm px-5 py-2.5 items-center cursor-not-allowed"
    disabled aria-busy="true" :aria-label="textAria">
    <i v-html="loaderIcon" class="size-5 animate-spin" />
    {{ textBtn }}
  </button>
  <button v-else-if="type === 'secondary'"
    class="w-full flex justify-end items-center text-primary-700 gap-2 leading-tight text-base font-bold cursor-not-allowed"
    disabled aria-busy="true" :aria-label="textAria">
    <i v-html="loaderIcon" class="size-5 animate-spin" />
    {{ textBtn }}
  </button>
</template>