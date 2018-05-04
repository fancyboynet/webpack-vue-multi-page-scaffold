/**
 * Created by Lenovo on 2017/12/10.
 */
import store from 'store/index'
export default function(){
    if(store.getters.userInfo){
        return store.getters.userInfo;
    }else if(localStorage.getItem('currentUser')){
        store.commit('Login', JSON.parse(localStorage.getItem('currentUser')));
        return store.getters.userInfo;
    }else{
        return null;
    }
}