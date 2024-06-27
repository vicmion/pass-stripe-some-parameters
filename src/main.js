import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import LuxonAdapter from "@date-io/luxon"

// const date = createDate()

const vuetify = createVuetify({
    components,
    directives,
    date: {
        adapter: LuxonAdapter,
        locale: {
            it: 'it-IT',
        }
    }
})

const app = createApp(App)

app.use(VueAxios, axios)
app.use(vuetify)
app.use(router)

app.mount('#app')