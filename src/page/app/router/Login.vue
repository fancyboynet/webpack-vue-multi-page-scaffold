<style lang="scss"
       scoped="">
    .wg_login {
        height: 100vh;
        overflow: hidden;
        position: relative;
        .bg {
            height: 100%;
            display: flex;
            flex-direction: column;
            filter: blur(2px);
        }
        .bg_mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
        }
        [class^="bg_"], [class *=" bg_"] {
            flex: 1;
            background-size: 100% 100%;
            background-position: top center;
        }
        .bg_1 {
            background-image: url("~assert/images/login_bg_1.jpg");
        }
        .bg_2 {
            background-image: url("~assert/images/login_bg_2.jpg");
        }
        .bg_3 {
            background-image: url("~assert/images/login_bg_3.jpg");
        }
        .login-form {
            position: absolute;
            background-color: #f3f5f8;
            border-radius: 8px;
            padding: 20px 55px 50px;
            width: 410px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .logo {
                text-align: center;
            }
            .el-form-item__label {
                font-size: 14px;
                color: #8f969e;
            }
            .el-button {
                display: block;
                width: 100%;
            }
            .mini-item{
              margin-top:-13px;
            }
        }
    }

</style>
<style lang="scss">
    .wg_login {
        .login-form {
            .captcha-row{
                .el-input__suffix{
                    right: 2px;
                    height: 36px;
                    width: 93px;
                    top: 2px;
                }
                .el-input__suffix-inner{
                    display: block;
                    height: 36px;
                    width: 93px;
                }
            }
            .captcha-img {
                display: block;
                width: 93px;
                height: 36px;
            }
        }
        .chooseLang{
          position: absolute;
          right:10px;
          top:20px;
          z-index:999;
          opacity:.8;
          .el-input__inner{
            background:rgba(255,255,255,.3);
            color:#fff;
          }
        }
        .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
          border-color:#405b84;
        }
        .el-input__inner:focus{
          border-color:#ffd50a;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #ffd50a;
            border-color: #ffd50a;
        }
        .el-checkbox__inner::after{
          border-color: #55553a;
        }
    }

</style>

<template>
    <div class="wg_login">
        <el-select class="chooseLang" v-model="lang" @change="change">
            <el-option value="zh_CN" label="简体中文"></el-option>
            <el-option value="en" label="ENGLISH"></el-option>
        </el-select>
        <div class="bg">
            <div class="bg_1"></div>
            <div class="bg_2"></div>
            <div class="bg_3"></div>
        </div>
        <div class="bg_mask"></div>
        <div class="login-form">
            <div class="logo">
                <img src="assert/images/logo_login.png"
                     alt="">
            </div>
            <el-form :model="form"
                     :rules="rules"
                     ref="form">
                <el-form-item prop="account"
                              :label="$t('label_account')">
                    <el-input v-model="form.account"
                              type="text"
                              :placeholder="$t('label_account_placeholder')"
                              @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item prop="password"
                              :label="$t('newsweb_txt_login_password')">
                    <el-input v-model="form.password"
                              type="password"
                              :placeholder="$t('label_password_placeholder')"
                              @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item prop="captcha"
                              :label="$t('newsweb_txt_login_code')"
                              class="captcha-row">
                    <el-input v-model="form.captcha"
                              type="text"
                              :placeholder="$t('newsweb_txt_login_code')"
                              @keyup.enter.native="login">
                        <img :src="captchaUrl"
                             class="captcha-img"
                             alt=""
                             slot="suffix"
                             @click.stop="refreshCaptcha"
                        >
                    </el-input>
                </el-form-item>
                <el-form-item class="mini-item">
                    <el-checkbox v-model="remember">{{$t('newsweb_txt_login_save')}}</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login"
                               type="warning"
                               ref="submitBtn">{{$t('newsweb_txt_login')}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {login, captchaUrl} from 'api/User'
  import {FAILED_NOTIFY_MSG,FAILED_CODE} from 'api/CustomConfigKeys'
  import urlParams from 'utils/urlParams'
  export default {
    data(){
      const vm = this;
      return {
        lang:"zh_CN",
        captchaUrl: captchaUrl + '?' + Math.random(),
        form: {
          account: '',
          password: '',
          captcha: ''
        },

        remember: false,
        loginLoading: false
      }
    },
    computed:{
      rules(){
        return {
          account: [
            {
              required: true, message: this.$t('validate_field_required',{field:this.$t('label_account')}) ,
              trigger: 'blur'
            },
            {
              type: 'email',
              message: this.$t('validate_email'),
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true, message: this.$t('validate_field_required',{field:this.$t('newsweb_txt_login_password')}),
              trigger: 'blur'
            }
          ],
          captcha: [
            {
              required: true, message: this.$t('validate_field_required',{field:this.$t('newsweb_txt_login_code')}),
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      refreshCaptcha(){
        this.captchaUrl = captchaUrl + '?' + Math.random();
      },
      login(){
        this.$refs.form.validate((valid) => {
          if (valid && !this.loginLoading) {
            let params = {
              account: this.form.account,
              password: this.form.password,
              captcha: this.form.captcha
            };
            this.loginLoading = true;
            login(params, {
              [FAILED_NOTIFY_MSG]: [this.$t('newsweb_txt_login_apply'),this.$t('newsweb_err_code'),this.$t('newsweb_err_password')],
              [FAILED_CODE]: ['-3','-2','-4']
            }).then(res => {
              this.loginLoading = false;
              if (res.code === 0) {
                if (this.remember) {
                  window.localStorage && localStorage.setItem('userAccountCache', this.form.account);
                  window.localStorage && localStorage.setItem('userPasswordCache', this.form.password);
                } else {
                  window.localStorage && localStorage.removeItem('userAccountCache');
                  window.localStorage && localStorage.removeItem('userPasswordCache');
                }
                this.$store.commit('Login', res.info);
                if (this.$route.query.redirect) {
                  this.$router.push({path: this.$route.query.redirect});
                } else {
                  this.$router.push({path: '/'});
                }
              }else{
                this.refreshCaptcha()
              }
            }).catch(_ => {
              this.loginLoading = false;
              this.refreshCaptcha()
            })
          }
        })
      },
      change(val){
        i18n.locale = val
        this.$router.push('?lang='+val)
      }
    },
    mounted(){
      const urlLang = urlParams('lang');
      if(!urlLang){
          if(localStorage && localStorage.lang){
            i18n.locale = localStorage.lang
            this.lang = i18n.locale
          }
      }else{
        this.lang = urlLang
      }
      i18n.locale = this.lang
      let userAccountCache = window.localStorage && localStorage.getItem('userAccountCache');
      if (userAccountCache) {
        this.form.account = userAccountCache;
        this.remember = true;
      }
      let userPasswordCache = window.localStorage && localStorage.getItem('userPasswordCache');
      if (userPasswordCache) {
        this.form.password = userPasswordCache;
        this.remember = true;
      }
    }
  }
</script>
