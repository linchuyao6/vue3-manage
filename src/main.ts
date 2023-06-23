import 'normalize.css'
import './assets/css/index.less'
import { createApp } from 'vue'
import store from './stores'
import registericons from './global/register-icons'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(registericons)
app.use(store)
app.use(router)
app.mount('#app')
