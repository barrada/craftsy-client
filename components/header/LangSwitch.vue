<template>
  <div class="flex space-x-2">
    <NuxtLink :to="switchLocalePath('en')" @click="setDirection('ltr')">English</NuxtLink>
    <NuxtLink :to="switchLocalePath('ar')" @click="setDirection('rtl')">العربية</NuxtLink>
    <NuxtLink :to="switchLocalePath('fr')" @click="setDirection('ltr')">Français</NuxtLink>
    <NuxtLink :to="switchLocalePath('es')" @click="setDirection('ltr')">Español</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

// Access i18n
const { locale } = useI18n();

// Function to set text direction
const setDirection = (direction: 'ltr' | 'rtl') => {
  document.documentElement.setAttribute('dir', direction);
};
</script>

<style scoped>
/* Add any specific styles here */
</style>