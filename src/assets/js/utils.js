// 工具库
// import md5 from 'blueimp-md5'

// 添加cookie
export function addCookie (name, value, expiresHours) {
    var cookieString = name + '=' + escape(value) + '; path=/'
    // 判断是否设置过期时间
    if (expiresHours > 0) {
        var date = new Date()
        date.setTime(date.getTime + expiresHours * 3600 * 1000)
        cookieString = cookieString + '; expires=' + date.toUTCString()
    }
    document.cookie = cookieString
}

// 获取cookie
export function getCookie (name) {
    var strCookie = document.cookie
    var arrCookie = strCookie.split(';')
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split('=')
        if (arr[0] === name) return unescape(arr[1])
    }
    return ''
}

// 删除cookie
export function deleteCookie (name) {
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    document.cookie = name + '=; path=/; expires=' + date.toUTCString()
}

// 事件绑定方法
export function bindEvent (element, type, func) {
    if (element.addEventListener) {
        element.addEventListener(type, func, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, func)
    } else {
        element['on' + type] = func
    }
}

// 移除事件绑定
export function removeEvent (element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler)
    } else {
        element['on' + type] = null
    }
}

// 深复制，要想达到深复制就需要用递归
export function deepCopy (o, co) {
    var c = co || {}
    for (var i in o) {
        if (typeof o[i] === 'object') {
            // 要考虑深复制问题了
            if (o[i].constructor === Array) {
                // 这是数组
                c[i] = []
            } else {
                // 这是对象
                c[i] = {}
            }
            deepCopy(o[i], c[i])
        } else {
            c[i] = o[i]
        }
    }
    return c
}

// 转换字节尺寸
export function bytesToSize (bytes, num) {
    if (bytes === 0) return '0 B'
    if (!num) {
        num = 2
    }
    var k = 1024
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toFixed(num) + ' ' + sizes[i]
}

// 格式化字符串时间
export function formatStringTime (str) {
    var time
    if (!str) return
    if (str.length === 14) {
        time = str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6, 8) + ' ' + str.slice(8, 10) + ':' + str.slice(10, 12) + ':' + str.slice(12, 14)
    }
    return time
}

// 转换秒成为字符串
export function secondToString (second) {
    var sec = parseInt(second)
    var min = '00'
    var hour = '00'
    if (sec < 10) {
        sec = '0' + sec
    }
    var time = hour + ':' + min + ':' + sec
    if (sec >= 60) {
        sec = sec % 60
        min = parseInt(sec / 60)
        if (sec < 10) {
            sec = '0' + sec
        }
        if (min < 10) {
            min = '0' + min
        }
        time = hour + ':' + min + ':' + sec

        if (min >= 60) {
            min = min % 60
            hour = parseInt(min / 60)
            if (min < 10) {
                min = '0' + min
            }
            if (hour < 10) {
                hour = '0' + hour
            }
            time = hour + ':' + min + ':' + sec
        }
    }

    return time
}

// 毫秒转为时间xxxx/xx/xx xx:xx:xx
export function msecToTime (msec) {
    if (!msec) {
        return msec
    } else {
        let time = new Date(msec)
        return time.getFullYear() + '/' +
      ((time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)) + '/' +
      (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ' ' +
      (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' +
      (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' +
      (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds())
    }
}

// 格式化日期
export function formatDate (date, fmt) {
    if (!date) {
        return date
    } else {
        let time = new Date(date)
        if (!fmt) {
            fmt = 'YYYY-MM-DD hh:mm:ss'
        }

        var o = {
            'M+': time.getMonth() + 1, // 月份
            'D+': time.getDate(), // 日
            'h+': time.getHours(), // 小时
            'm+': time.getMinutes(), // 分
            's+': time.getSeconds(), // 秒
            'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
            'S': time.getMilliseconds() // 毫秒
        }
        if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
    }
}

// 计算字符串所占字节数
export function sizeof (str, charset) {
    let total = 0
    let charCode
    let i
    let len

    charset = charset ? charset.toLowerCase() : ''
    if (charset === 'utf-16' || charset === 'utf16') {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0xffff) {
                total += 2
            } else {
                total += 4
            }
        }
    } else {
        for (i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i)
            if (charCode <= 0x007f) {
                total += 1
            } else if (charCode <= 0x07ff) {
                total += 2
            } else if (charCode <= 0xffff) {
                total += 3
            } else {
                total += 4
            }
        }
    }
    return total
}

// 生成唯一标识
export const guid = () => {
    return Math.random().toString().substr(3, 4) + Date.now().toString(36)
}

// 获取当前url的参数
export const GetQuery = name => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg) // 获取url中"?"符后的字符串并正则匹配
    if (r != null) {
        return encodeURIComponent(r[2])
    }
    return null
}

// 获取给定文件url扩展名
export const getExtend = (url) => {
    let index = url.lastIndexOf('.')
    let extend = url.slice(index + 1) // 后缀名
    return extend
}
