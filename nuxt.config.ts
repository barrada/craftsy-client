import { defineNuxtConfig } from "nuxt/config";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_GATEWAY
    }
  }, 
  app: {
    head: {
      htmlAttrs:{
        class: 'h-full bg-gray-100'
      },
      bodyAttrs:{
        class: 'h-full'
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['nuxt-svgo', '@nuxtjs/i18n', '@nuxt/image'],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json'},
      { code: 'ar', name: 'Arabic', file: 'ar.json', dir: 'rtl' },
      { code: 'fr', name: 'French', file: 'fr.json'},
      { code: 'es', name: 'Spanish', file: 'es.json'},
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    fallbackLocale: 'en',
    strategy: 'prefix', // Change this to 'prefix' to include language codes in the URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossDomain: true,
    },

  },
  svgo: {
    autoImportPath: './assets/',
  },
  image: {
    dir: 'assets/img/',
  }
  
  
})