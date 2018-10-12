import Vue from 'vue'
import utils from '@/utils'

Vue.filter('timeFormat', function (value,format) {
    return utils.formatTime(value,format)
});
Vue.filter('toFixed', function (value,digits) {
    if(value == null || value == undefined ) {
        value = 0
    }
    return parseFloat(value).toFixed(digits)
});
