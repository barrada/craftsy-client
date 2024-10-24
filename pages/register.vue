<!-- Registration Component -->
<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
      <h1 class="text-xl font-bold mb-5">{{ $t('registration.register') }}</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">{{ $t('registration.name') }}</label>
        <input v-model="name" type="text" id="name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">{{ $t('registration.password') }}</label>
        <input v-model="password" type="password" id="password" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">{{ $t('registration.phone') }}</label>
        <input v-model="phone" type="tel" id="phone" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{{ $t('registration.submit') }}</button>
      <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const apiUrl = `${config.public.apiBase}/users/register`;

const name = ref('');
const password = ref('');
const phone = ref('');
const errorMessage = ref('');

const register = async () => {
  try {
    const response = await $fetch(apiUrl, {
      method: 'POST',
      body: {
        name: name.value,
        password: password.value,
        phone: phone.value,
      },
    });

    console.log('User registered:', response);
    // Redirect or perform any other necessary actions after successful registration
  } catch (error) {
    errorMessage.value = error.data || 'Registration failed';
    console.error('Registration error:', error);
  }
};
</script>