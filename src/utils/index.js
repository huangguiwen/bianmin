/**
 * Created by jiachenpan on 16/11/18.
 */

function parseTime(time, fmt) {
    // yyyy-MM-dd HH:mm:ss
    fmt = fmt || 'yyyy年MM月dd日 HH时mm分ss秒';
    var o = {
        "M+": time.getMonth() + 1,                 //月份
        "d+": time.getDate(),                    //日
        "h+": time.getHours(),                   //小时
        "m+": time.getMinutes(),                 //分
        "s+": time.getSeconds(),                 //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function formatTime(time, option) {
    if(time) {
        var _time = time.toString() 
        if(_time.length == 10) {
            _time = parseInt(_time.concat('000'))
        }
    }
    

    const d = new Date(_time)
    const now = Date.now()
  
    if (option) {
        return parseTime(d, option)
    } else {
        const diff = (now - d) / 1000;
        if (diff < 60) {
            return '刚刚'
        } else if (diff < 3600) { // less 1 hour
            return Math.floor(diff / 60) + '分钟前'
        } else if (diff < 3600 * 24) {
            return Math.floor(diff / 3600) + '小时前'
        } else if (diff < 3600 * 24 * 2) {
            return '1天前'
        }
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

export default {
    formatTime
}
