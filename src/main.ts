import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { OhVueIcon, addIcons  } from "oh-vue-icons"
import { IoArrowForward, IoMenu, IoShieldCheckmarkSharp, IoRemoveCircleOutline, IoAddCircleOutline, IoCartOutline, IoTrashOutline  } from "oh-vue-icons/icons"

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.component("v-icon", OhVueIcon)
addIcons(IoArrowForward, IoMenu, IoShieldCheckmarkSharp, IoRemoveCircleOutline, IoAddCircleOutline, IoCartOutline, IoTrashOutline )

app.mount('#app')
