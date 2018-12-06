import axios from 'axios'
import returnCode from './enums/return-code'

axios.defaults.timeout = 5000
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Login-Token'] = localStorage.getItem('Login-Token')
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.baseURL = '/v1'

// 添加一个响应拦截器
axios.interceptors.response.use(
    function(res) {
        // 在这里对返回的数据进行处理
        if (res.data.stateCode) {
            res.data.message = returnCode[res.data.stateCode]
        }

        return res
    },
    function(err) {
        // 处理请求错误
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break

                case 401:
                    err.message = '未授权，请登录'
                    // location.href = ''
                    break

                case 403:
                    err.message = '拒绝访问'
                    break

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break

                case 408:
                    err.message = '请求超时'
                    break

                case 500:
                    err.message = '服务器内部错误'
                    break

                case 501:
                    err.message = '服务未实现'
                    break

                case 502:
                    err.message = '网关错误'
                    break

                case 503:
                    err.message = '服务不可用'
                    break

                case 504:
                    err.message = '网关超时'
                    break

                case 505:
                    err.message = 'HTTP版本不受支持'
                    break

                default:
            }
        }

        return Promise.reject(err)
    }
)

export default axios
