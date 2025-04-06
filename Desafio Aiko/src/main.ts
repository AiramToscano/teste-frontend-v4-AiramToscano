import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import PrimeVue from 'primevue/config'
import '@/assets/styles/theme.scss'

import Dialog from 'primevue/dialog'

import L from 'leaflet'

// Corrige problema dos ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    'leaflet/dist/images/marker-icon-2x.png',
    import.meta.url,
  ).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    .href,
})

const app = createApp(App)

app.use(PrimeVue)
app.component('Dialog', Dialog)

app.mount('#app')
