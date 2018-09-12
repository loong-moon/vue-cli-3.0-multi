import Vue from 'vue'
import global from '@/assets/js/global'

import '@/assets/sass/_app.scss' // 要想提取到公共css上，必须import引用
import App from './App.vue'

Vue.use(global)

new Vue({
    render: h => h(App)
}).$mount('#app')
