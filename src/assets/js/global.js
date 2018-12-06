import axios from './axios'
import { formatDateTime } from './utils'

const components = {
}

const filters = {
    formatDateTime // 格式化日期时间
}

export default {
    install (vue) {
        // 注册全局过滤器
        for (let key of Object.keys(filters)) {
            vue.filter(key, filters[key])
        }

        // 注册全局组件
        for (let key of Object.keys(components)) {
            vue.component(components[key].name, components[key])
        }

        vue.prototype.$http = axios
        vue.config.productionTip = false
    }
}
