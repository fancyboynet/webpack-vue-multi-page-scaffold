<template>
  <div>
    <MainHeader :name="$t('newsweb_txt_web_setting')">
      <div slot="tools">
        {{$t('newsweb_txt_subject_setlist')}}{{currentPosition}}
        <el-button type="warning" @click="toEdit" size="min">{{$t('newsweb_txt_web_setting')}}</el-button>
      </div>
    </MainHeader>
    <el-form label-width="220px" style="margin: 20px 0 60px;" v-if="showForm">
      <el-form-item :label="$t('newsweb_txt_subject_setlist')">
        <el-input v-model="position" :placeholder="placeholder" style="width: 180px;"	></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toSubmit" style="width: 150px;">{{$t('newsweb_btn_ok')}}</el-button>
        <el-button @click="toCancel" style="width: 150px;">{{$t('newsweb_btn_cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import MainHeader from 'components/main-header.vue'
  import {updatePos, readPos} from 'model/subject'

  export default {
    data () {
      return {
        currentPosition: null,
        position: null,
        min: 1,
        max: 20,
        showForm: false
      }
    },
    computed: {
      placeholder(){
        return this.min + '-' + this.max
      }
    },
    components:{
      MainHeader
    },
    mounted () {
      readPos().then((i) => {
        this.currentPosition = i
      })
    },
    methods: {
      check () {
        if(!/^([1-9]|1\d)$/.test(this.position)){
          this.$notify.error({
            message: this.$t('web_txt_error_para'),
            duration: 2000
          })
          return false
        }
        return true
      },
      toSubmit () {
        if(this.check()){
          updatePos(this.position).then(() => {
            this.currentPosition = this.position
            this.position = null
            this.showForm = false
            this.$notify.success({
              message: this.$t('sucess_util'),
              duration: 2000
            })
          })
        }
      },
      toCancel () {
        this.showForm = false
      },
      toEdit () {
        this.showForm = true
      }
    }
  }
</script>
