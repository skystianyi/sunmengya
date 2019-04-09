<template>
  <div class="shopcart">
    <!-- title -->
    <van-nav-bar title="购物车" fixed />
    <!-- 下拉刷新 -->
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-checkbox-group class="card-goods" v-model="checkedGoods" v-if="islogin">
          <van-checkbox
            class="card-goods__item"
            v-for="item in goods"
            :key="item._id"
            :name="item._id"
          >
            <van-card
              v-if="item.product"
              :thumb="`https://api.cat-shop.penkuoer.com${item.product.coverImg}`"
              :desc="item.product.descriptions"
              :price="item.product.price"
              :thumb-link="`/list/${item.product._id}`"
              centered
              lazy-load
            >
              <!-- solt 删除 -->
              <div slot="tags" class="del">
                <van-icon
                  name="delete"
                  color="#f44"
                  size="20px"
                  @click.stop="Delete(item._id)"
                />
              </div>
              <!-- solt 标题 -->
              <div class="van-ellipsis" slot="title">{{ item.product.name }}</div>

              <!-- solt 步进器==数量加减 -->
              <div slot="num" @click.stop>
                <van-stepper
                  v-model="item.quantity"
                  @plus="SetPlus(item._id)"
                  @minus="SetMinus(item._id)"
                />
              </div>
            </van-card>
          </van-checkbox>
        </van-checkbox-group>
        <div v-else class="nologin">
          <van-row type="flex" justify="center" style="flex-wrap:wrap;text-align:center">
            <van-col span="16">
              <img src="https://img07.yiguoimg.com/d/web/180313/013112/195558/img_nogoods@3x.png" alt="" style="width:100%">
            </van-col>
            <van-col span="24">
              <span class="tip">登录后可同步购物车中商品</span>
            </van-col>
            <van-col span="10" class="nomargin">
              <router-link :to="{name:'login'}" class="linktologin">登录</router-link>
            </van-col>
            <van-col span="20">
              <router-link :to="{name:'list'}" class="linktolist">去逛逛</router-link>
            </van-col>
          </van-row>
        </div>
      </van-pull-refresh>
    <!-- 提交订单 -->
      <van-submit-bar
      v-if="islogin"
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit" >
      <van-checkbox v-model="checkedAll" @click="checkedallHandle()">全选</van-checkbox>
    </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import serverUrl from '../utils/config.js'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Stepper, PullRefresh, Row, Col, Dialog } from 'vant';
import { setTimeout } from 'timers';

Vue.use(VueLazyload, Stepper, PullRefresh, Row, Col);

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },

  data() {
    return {
      islogin:false,
      goods:[],
      checkedAll: false,
      checkedGoods: [],
      sumNumber: 1,
      isLoading: false,
      ObjUrl: serverUrl
    };
  },

  created() {/* 请求购物车数据 */
    if(sessionStorage.getItem('token')){
        this.islogin=true;
        axios.get('https://api.cat-shop.penkuoer.com/api/v1/shop_carts',{
          headers:{
            'authorization':'Bearer '+sessionStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res.data);
          this.goods = res.data;
          // this.goods.forEach((item, index) => {
          // this.goods[index].checked = false
          // })
        })
        .catch(err=>{
          Toast(`${err}`);
        })
    }
    else this.islogin=false
  },

  computed: {
    /* 结算个数 */
    submitBarText() {
      const count = this.goods.reduce(
        (total, item) => total + (this.checkedGoods.indexOf(item._id) !== -1 ? item.quantity : 0), 0 );
      return "结算" + `(${count})`;
    },

    /* 结算价格 */
    totalPrice() {
      const count = this.goods.reduce(
        (total, item) => total + (this.checkedGoods.indexOf(item._id) !== -1 ? item.product.price * item.quantity : 0), 0 );
        if(count){ return count*100 }
        else return 0
    }
  },

  methods: {
    /* 格式化价格 */
    formatPrice(price) {
      // return (price / 100).toFixed(2);
    },

    /* 提交订单 */
    onSubmit() {
      Toast("点击结算");
    },

    /* 下拉刷新 */
    onRefresh() {
      if(sessionStorage.getItem('username')){
        this.islogin=true;
        setTimeout(() => {
            axios.get('https://api.cat-shop.penkuoer.com/api/v1/shop_carts',{
              headers:{
                'authorization':'Bearer '+sessionStorage.getItem('token')
              }
            })
            .then(res => {
              this.goods = res.data;
              this.$toast({
                duration: 1000,
                message: "刷新成功"
              });
              this.isLoading = false;
            })
            .catch(err => {
              this.$toast.fail(`刷新失败:${err}`);
              this.isLoading = false;
            });
        }, 500);
      }
      else{
        this.islogin=false
          setTimeout(()=>{
            this.isLoading = false
          },500)
      }
    },

    /* 增加个数 */
    SetPlus(id) {
      // axios.post('http://api.cat-shop.penkuoer.com/api/v1/shop_carts',
      // {
      //   product:id,
      // },{
      //   headers:{
      //     'authorization':'Bearer '+ sessionStorage.getItem('token')
      //   }
      // })
      // .then(res => {
      //   this.$toast.loading({
      //     duration: 500,
      //     loadingType: "spinner"
      //   });
      // })
      // .catch(err => {
      //   this.$toast.fail(`增加数量失败:${err}`);
      // });
    },

    /* 减少个数 */
    SetMinus(id, gid) {
      // get(
      //   `http://47.104.244.134:8080/cartupdate.do?token=3705&id=${id}&gid=${gid}&num=-1`
      // )
      //   .then(res => {
      //     this.goods = res.data;
      //     this.$toast.loading({
      //       duration: 200,
      //       loadingType: "spinner"
      //     });
      //   })
      //   .catch(err => {
      //     this.$toast.fail(`减少数量失败:${err}`);
      //   });
    },

    Delete(id) {
      Dialog.confirm({
        title: "确认删除么？"
      })
        .then(() => {
          // on confirm
          axios.delete('https://api.cat-shop.penkuoer.com/api/v1/shop_carts/' + id,{
              headers:{
                'authorization':'Bearer '+ sessionStorage.getItem('token')
              }
            })
          .then(res => {
            axios.get('https://api.cat-shop.penkuoer.com/api/v1/shop_carts',{
              headers:{
                'authorization':'Bearer '+sessionStorage.getItem('token')
              }
            })
            .then(res => {
              this.goods = res.data;
              this.$toast.loading({
                duration: 200,
                loadingType: "spinner"
              });
              this.isLoading = false;
            })
          })
          .catch(err => {
                this.$toast.fail(`删除失败:${err}`);
              });
        })
        .catch(() => {
          // on close
        });
    },

      /* 单选 */
    checkedOne() {
    },

      /* 全选 */
    checkedallHandle() {
      // this.goods.forEach((item, index) => {
      //   this.checkedAll=!this.checkedAll
      //   this.goods[index].checked = this.checkedAll
      // })
    }
  }
};
</script>

<style lang="less">
.shopcart {
  /* 下拉刷新 center */
  .van-pull-refresh {
    padding: 46px 0 100px 0;
    .nologin{
      .van-col{
        margin-bottom: 16px;
        &.nomargin{
          margin-bottom: 0;
        }
      }
      .tip{
        color: #7d7e80;
        font-size: 16px;
      }
      .linktologin{
        display: inline-block;
        width: 100px;
        height: 30px;
        border: 1px solid #11b57c;
        border-radius: 6px;
        line-height: 30px;
        font-size: 14px;
        color: #11b57c;
        text-align: center
      }
      .linktolist{
        color: #7d7e80;
        font-size: 14px;
        float: right
      }
    }
  }
  .card-goods {
    background-color: #f7f8fa;
    z-index: 6;
    padding-top: 20px;
    padding-bottom: 20px;

    .card-goods__item {
      position: relative;
      background-color: #fff;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0px;
      }

      .van-checkbox__label {
        width: 100%;
        height: auto;
        padding: 0 10px 0 28px;
        box-sizing: border-box;
        .van-card {
          padding: 5px 15px;
          background-color: #fff;
          .del {
            text-align: right;
          }
          .van-card__footer {
            margin-top: -32px;
          }
        }
      }

      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
        .van-icon {
          border-color: #7d7e80;
        }
      }
      .van-card__price {
        color: #f44;
      }
    }
  }

  .van-submit-bar {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 12px;
      .van-icon {
        border-color: #7d7e80;
      }
    }
  }
}
</style>
