import Vue from 'vue'
import moment from 'moment'
import {CHECK_STATUS} from 'config/config'

export default function () {
  Vue.filter('toFixed2', function (value) {
    return Number(value.toFixed(2));
  });

  Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD';
    return moment(value*1000).format(formatString)
  });

  Vue.filter('checkStatusLabel', function (value) {
    let ret;
    for(let key in CHECK_STATUS){
      if(CHECK_STATUS[key].value === value){
        ret  = CHECK_STATUS[key].label;
        break;
      }
    }
    return ret;
  });
  Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase()
  })
}
