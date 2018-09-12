import axios from './axios'
import { formatDate } from './utils'

export default {
    install (vue) {
        vue.filter('formatTime', function (value) {
            let time = formatDate(value)
            // 返回处理后的值
            return time
        })

        vue.prototype.$http = axios
    }
}
