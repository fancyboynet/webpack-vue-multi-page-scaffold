<style lang="scss">
.plate-mod{
  background:#fff;
  .plate-content{

    .rows{
      border-bottom:1px solid #cfd2d5;
      padding:20px 40px;
      h3{
        font-size:18px;
        font-weight: bold;
        color:#1b1b1b;
        line-height:30px;
      }
      p{
        font-size:14px;
        color:#8f969e;
        line-height:30px;
        height:30px;
        margin-bottom:15px;
        span{
          //margin-right:5px;
          &:after{
            content: " 、";
          }
          &:last-child:after{
            content: "";
          }
        }
      }
    }
  }
  .mypop{
    width:800px;
  }
  .el-dialog__body{
    padding:10px 20px;
  }
  .el-textarea__inner{
    border-radius:0;
  }
}
</style>

<template>
  <div class="plate-mod">
    <MainHeader :name="$t('newsweb_txt_web_layout')">
      <el-button type="warning" slot="tools" @click="addPlate" size="medium">{{$t('newsweb_txt_layout_new')}}</el-button>
    </MainHeader>
    <div class="plate-content">
      <div class="rows" v-for="(val,i) in dataList" :key="val.Id" >
        <h3>{{val.Defaultname}}</h3>
        <p>
          <span v-for="name in val.ModuleNameList">{{name.ModuleName}}</span>
        </p>
        <el-button size="mini" class="btn" @click="editPlate(val)">
          {{$t('newsweb_txt_web_edit')}}
        </el-button>
        <el-button size="mini" class="btn" @click="deletePlate(val.Id)" >
          {{$t('newsweb_txt_web_delete')}}
        </el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="mypop"
      :title="title"
    >
      <div v-if="dialogVisible">
        <el-input :placeholder="$t('plate_name_placeholder')" v-model="name"></el-input>
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="(val,key) in langListNew"
            :label="val"
            :name="key"
            :key="key">
            <el-input
              type="textarea"
              :rows="6"
              :placeholder="$t('plate_lang_msg')"
              :ref="key"
            >
            </el-input>
          </el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('newsweb_btn_cancel')}}</el-button>
        <el-button type="primary" @click="submit(0)">{{$t('newsweb_btn_ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MainHeader from 'components/main-header.vue'
import {getPlateList,deletePlate,addPlate} from 'api/Plate'
export default {
  data(){
    return {
      id: 0,
      dataList: [],
      dialogVisible: false,
      activeName: 'en',
      title: this.$t('newsweb_txt_layout_new'),
      name: '',
      nameList: []
    }
  },
  computed:{
    langListNew(){
      return this.$store.getters.langListNew
    },
    langList(){
      return this.$store.getters.langList
    }
  },
  components:{
    MainHeader
  },
  methods:{
    getPlateList(){
      getPlateList().then((res)=>{
        if(res.code == 0){
          this.dataList = res.datalist
        }
      })
    },
    deletePlate(id){
      this.$confirm(this.$t('plate_is_delete'), '', {
        confirmButtonText: this.$t('newsweb_btn_ok'),
        cancelButtonText: this.$t('newsweb_btn_cancel'),
        type: 'warning'
      }).then(() => {
        deletePlate({id:id}).then((res)=>{
          if(res.code == 0){
            this.$notify({
              message: this.$t('delete_success')
            })
            this.getPlateList()
          }
        })
      }).catch(() => {});
    },
    addPlate(){
      this.id = 0
      this.dialogVisible = true
      this.name = ''
      this.activeName = 'en'
    },
    editPlate(info){
      this.id = info.Id
      this.name = info.Defaultname
      this.dialogVisible = true
      this.activeName = info.ModuleNameList[0].Lang
      setTimeout(()=>{
        info.ModuleNameList.map((val,i)=>{
          this.$refs[val.Lang][0].$refs.textarea.value = val.ModuleName
        })
      },500)




    },
    submit(){
      if(this.name == ''){
        this.$notify({message:this.$t('plate_default_title')})
        return
      }
      if(this.name.length > 40){
        this.$notify({message:this.$t('plate_default_title_less_40')})
        return
      }
      var arr = []
      var flag = false
      for(let key in this.langListNew){
        var value = this.$refs[key][0].$refs.textarea.value
        if(value){
          let obj = {
            InfoModuleName: value,
            Lang: key
          }
          arr.push(obj)
          if(value.length > 40){
            flag = true
          }
        }

      }
      if(flag){
        this.$notify({message:this.$t('plate_sub_title_less_40')})
        return
      }
      var params = {
        id: this.id,
        weight: 0,
        name: this.name,
        namelist: JSON.stringify(arr)
      }
      var msg = this.id == 0 ? this.$t('plate_add_success') : this.$t('plate_edit_sucess')
      addPlate(params).then((res)=>{
        if(res.code == 0){
          this.$notify({message:msg})
          this.getPlateList()
          this.dialogVisible = false
        }
      })

    }
  },
  mounted(){
    this.getPlateList()
  }
}
</script>
