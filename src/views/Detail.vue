<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="goods">
      <img
        class="detailImg"
        :src="`https://api.cat-shop.penkuoer.com` + goods.coverImg"
      />

      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ goods.name }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ "免运费" }}</van-col>
          <van-col span="14">剩余：{{ goods.quantity }}</van-col>
        </van-cell>
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
          <template slot="title">
            <span class="van-cell-text">有赞的店</span>
            <van-tag class="goods-tag" type="danger">官方</van-tag>
          </template>
        </van-cell>
        <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
      </van-cell-group>

      <van-cell-group class="goods-cell-group">
        <van-cell title="查看商品详情" is-link @click="sorry" />
      </van-cell-group>

      <van-goods-action>
        <van-goods-action-mini-btn icon="chat-o" @click="sorry">
          客服
        </van-goods-action-mini-btn>
        <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
          购物车
        </van-goods-action-mini-btn>
        <van-goods-action-big-btn @click="sorry">
          加入购物车
        </van-goods-action-big-btn>
        <van-goods-action-big-btn primary @click="sorry">
          立即购买
        </van-goods-action-big-btn>
      </van-goods-action>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-mini-btn
        info="5"
        icon="cart-o"
        text="购物车"
      />
      <van-goods-action-mini-btn
        icon="shop-o"
        text="店铺"
      />
      <van-goods-action-big-btn text="加入购物车" @click="addToCart"/>
      <van-goods-action-big-btn
        primary
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import axios from 'axios';
import {getProductDetail} from '../services/products.js'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from "vant";
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },
  data() {
    return {
      title: "详情",
      goods: {
        title: "美国伽力果（约680g/3个）",
        price: 2680,
        express: "免运费",
        remain: 19,
        coverImg:'',
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    formatPrice() {
      return "¥" + (this.goods.price).toFixed(2);
    },
    onClickCart() {
      this.$router.push("cart");
    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
    addToCart(){
      if(!sessionStorage.getItem('token')){
        alert("请登录你的账户，然后再次加入购物车！")
      }else{
        this.$eventBus.$emit('addToCart')
      axios.post('https://api.cat-shop.penkuoer.com/api/v1/shop_carts',
      {
        product:this.$route.params.id
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
      }
      
    },
  },
  created() {
    getProductDetail(this.$route.params.id)
      .then(res => {
        this.goods = res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }
};
</script>

<style lang="less" scope>
.van-goods-action {
  z-index: 5;
}
.goods {
  padding-top: 50px;
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
.detailImg {
  width: 100%;
  height: 300px;
}
</style>
