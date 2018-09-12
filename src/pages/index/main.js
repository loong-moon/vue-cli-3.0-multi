import Vue from 'vue'
import router from './router'
import store from './store'
import global from '@/assets/js/global'

import '@/assets/sass/_app.scss'
import App from './App.vue'

Vue.use(global)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
