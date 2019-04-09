<template>
  <div class="listbox">
    <van-nav-bar
      :title="$route.params.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="(pro, index) in products"
        :key="index"
        :num="pro.quantity"
        :price="pro.price"
        :desc="pro.descriptions"
        :title="pro.name"
        :thumb="'https://api.cat-shop.penkuoer.com' + pro.coverImg"
        :thumb-link="`#/list/${pro._id}`"
      >
        <div slot="footer">
          <van-button class="addCartBtn" size="mini" @click="addToCart(pro._id)"
            ><van-icon class="cart" name="cart"
          /></van-button>
        </div>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios';
import {getProducts} from '../services/products.js'
export default {
  data() {
    return {
      page: 1,
      totalCount: 0,
      loading: false,
      finished: false,
      products: []
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page += 1;
        this.loadData();
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.products.length >= this.totalCount) {
          this.finished = true;
        }
      }, 1000);
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    addToCart(id){
      if(sessionStorage.getItem('token')){
        this.$eventBus.$emit('addToCart')
          axios.post('http://api.cat-shop.penkuoer.com/api/v1/shop_carts',
          {
            product:id
          },{
            headers:{
              'authorization':'Bearer '+sessionStorage.getItem('token')
            }
          })
          .then(res=>{
            console.log(res)
            this.$router.push({
            name:'shopcart'
          })
          }).catch(err=>{
            console.log(err)
          })
      }else{
        this.$dialog.alert({
          message: '请先登录'
        }).then(()=>{
          this.$router.push({
            name:'login'
          })
        })
        
      }
    },
    loadData(){
       getProducts({page:this.page}).then(res=>{
        this.products=this.products.concat(res.data.products);
        this.totalCount=res.data.totalCount;
        }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style scope>
.listbox {
  padding: 50px 0;
}
.addCartBtn {
  background: #f00 !important;
  color: #fff !important;
  border-radius: 5px !important;
  font-size: 18px !important;
  height: 20px !important;
  line-height: 20px !important;
}
</style>
