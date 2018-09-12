import axios from './axios'
import { formatDate } from './utils'

export default {
    install(vue) {
        vue.filter('formatTime', function(value) {
            // 返回处理后的值
            return formatDate(value)
        })

        vue.prototype.$http = axios
        vue.config.productionTip = false
    }
}
