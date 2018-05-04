import Vue from 'vue';
//时间转换
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
		}
	}
	return fmt
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}

export function moveArrayIndex (array, from, to) {
  if(from === to){
    return array
  }
  let min = Math.min(from, to)
  let max = Math.max(from, to)
  if(min < 0){
    return array
  }
  if(max > (array.length -1)){
    return array
  }
  let arr1 = array.slice(0, min + 1)
  let arr2 = array.slice(min + 1, max + 1)
  let arr3 = array.slice(max + 1)
  let a = arr1.slice(-1)[0]
  let b = arr2.slice(-1)[0]
  arr1.splice(-1, 1, b)
  arr2.splice(-1, 1, a)
  return arr1.concat(arr2).concat(arr3)
}
