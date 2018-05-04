/**
 * Created by yeahsing on 2017/7/25.
 */
export default function (key) {
    let href = window.location.href;
    let searchStr;

    if(href.indexOf('?') === -1){
        searchStr = '';
    }else{
        searchStr = href.split('?')[1];
    }

    let searchArr = searchStr.split('&');
    let params = {};
    searchArr.forEach((e, i) => {
        let key = e.split('=')[0],
            value = e.split('=')[1];
        params[key] = value;
    });
    if(typeof key != 'undefined'){
        return params[key];
    }
    return params;
}