<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="active"  @change="changeNav()">
      <van-tabbar-item icon="wap-home" :to="{name:'home'}">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" :to="{name:'sort'}">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :info="cartNum" :to="{name:'shopcart'}">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{name:'myeg'}">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
export default {
  created () {
    this.$eventBus.$on('addToCart',()=>{
      this.cartNum++;
    })
    if(sessionStorage.getItem('token')){
      axios.get('http://api.cat-shop.penkuoer.com/api/v1/shop_carts', {
        headers: {
          'authorization':'Bearer '+sessionStorage.getItem('token')
        }
      }).then(res=>{
        console.log(res)
        res.data.forEach(el => {
          this.cartNum+=el.quantity;
        })
      }).catch(err=>{
        console.log(err)
      })
    }else{
      this.cartNum=0;
    }
    
    this.active=sessionStorage.getItem('active')*1
    this.$eventBus.$on('mainNavActive', (active) => {
      if (active==='myeg') {
        this.active=4
      }
      switch (active) {
        case "myeg":
          this.active = 4;
          break;
        case "list":
          this.active = 1;
          break;
        case "home":
          this.active = 0;
          break;
        default:
          this.active = 0;
          this.$router.push({
            name: "home"
          });
          break;
      }
    });
  },
  data() {
    return {
      cartNum:0,
      active: 0
    }
  },
  methods: {
    changeNav(){
      sessionStorage.setItem('active',this.active)
    }
  },
}
</script>
<style>
html,body{height: 100%;}
#app{height: 100%;}
</style>
