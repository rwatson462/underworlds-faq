import { inject } from '@vercel/analytics';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import {router} from './router/router'
import {vuetify} from "@/setup/vuetify";

inject()

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .mount('#app')
