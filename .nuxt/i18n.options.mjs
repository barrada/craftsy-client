
// @ts-nocheck


export const localeCodes =  [
  "en",
  "ar",
  "fr",
  "es"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale__Users_abarrada_Documents_dev_craftsy_client_locales_en_json" */), cache: true }],
  "ar": [{ key: "../locales/ar.json", load: () => import("../locales/ar.json" /* webpackChunkName: "locale__Users_abarrada_Documents_dev_craftsy_client_locales_ar_json" */), cache: true }],
  "fr": [{ key: "../locales/fr.json", load: () => import("../locales/fr.json" /* webpackChunkName: "locale__Users_abarrada_Documents_dev_craftsy_client_locales_fr_json" */), cache: true }],
  "es": [{ key: "../locales/es.json", load: () => import("../locales/es.json" /* webpackChunkName: "locale__Users_abarrada_Documents_dev_craftsy_client_locales_es_json" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "files": [
        "/Users/abarrada/Documents/dev/craftsy/client/locales/en.json"
      ]
    },
    {
      "code": "ar",
      "name": "Arabic",
      "dir": "rtl",
      "files": [
        "/Users/abarrada/Documents/dev/craftsy/client/locales/ar.json"
      ]
    },
    {
      "code": "fr",
      "name": "French",
      "files": [
        "/Users/abarrada/Documents/dev/craftsy/client/locales/fr.json"
      ]
    },
    {
      "code": "es",
      "name": "Spanish",
      "files": [
        "/Users/abarrada/Documents/dev/craftsy/client/locales/es.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix",
  "lazy": true,
  "langDir": "locales/",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true,
    "cookieCrossDomain": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "fallbackLocale": "en",
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "files": [
      {
        "path": "/Users/abarrada/Documents/dev/craftsy/client/locales/en.json"
      }
    ]
  },
  {
    "code": "ar",
    "name": "Arabic",
    "dir": "rtl",
    "files": [
      {
        "path": "/Users/abarrada/Documents/dev/craftsy/client/locales/ar.json"
      }
    ]
  },
  {
    "code": "fr",
    "name": "French",
    "files": [
      {
        "path": "/Users/abarrada/Documents/dev/craftsy/client/locales/fr.json"
      }
    ]
  },
  {
    "code": "es",
    "name": "Spanish",
    "files": [
      {
        "path": "/Users/abarrada/Documents/dev/craftsy/client/locales/es.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
