<template>
  <div class="home">
    <!-- top search -->
    <van-nav-bar
      fixed
      @click-left="onClickLeft()"
      @click-right="onClickRight()"
    >
      <span slot="left">城市<van-icon name="arrow-down" color="#fff"/></span>
      <van-search
        slot="title"
        placeholder="请输入搜索关键词"
        shape="round"
        background="transparent"
        @click="onSearch()"
      />
    </van-nav-bar>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
      <!-- banner swipe -->
      <div class="imgSli">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index" @click="tiaozhuanhandle()">
            <img v-lazy="image" class="changechicun" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- banner ad -->
      <div class="first-screen" @click="tiaozhuanhandle()">
        <img :src="firstBanner" class="firstbanner"/>
      </div>
      <!-- home sort -->
      <div class="homeSort  van-hairline--bottom" @click="tiaozhuanhandle()">
        <van-row
          type="flex"
          justify="space-between"
          align="center"
          style="flex-wrap:wrap"
        >
          <van-col span="6" v-for="(sort, index) in Sort" :key="index">
            <div>
              <img :src="sort.src" :alt="sort.txt" class="sort"/>
            </div>
            <div>{{ sort.txt }}</div>
          </van-col>
        </van-row>
      </div>

      <!-- NoticeBar -->
      <div class="noticeSlide">
        <van-swipe
          :autoplay="3000"
          vertical
          :height="40"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(bar, index) in NoticeBar" :key="index">
            <van-notice-bar
              :text="bar"
              left-icon="volume-o"
              :scrollable="false"
              mode="link"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-pull-refresh>
    <!-- 下拉刷新 -->
  </div>
</template>

<script>
import Vue from "vue";
import VueLazyload from "vue-lazyload";
import { Toast, PullRefresh, Row, Col } from "vant";

Vue.use(VueLazyload, PullRefresh, Row, Col);

/* swipe img list */
const mock = {
  swipe: [
    "https://f11.baidu.com/it/u=1958490809,1691334580&fm=72",
    "https://f10.baidu.com/it/u=2648954178,707991817&fm=72",
    "http://img3.imgtn.bdimg.com/it/u=2806101576,828957987&fm=26&gp=0.jpg",
    "http://img0.imgtn.bdimg.com/it/u=4032547426,2267968566&fm=200&gp=0.jpg",
    "https://f11.baidu.com/it/u=1808728771,3488766432&fm=72",
    "https://f12.baidu.com/it/u=3297161960,1254830237&fm=72",
    "http://img1.imgtn.bdimg.com/it/u=1345116308,1589445689&fm=26&gp=0.jpg"
  ],
  firstBanner: {
    src:
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=331395328,2707688664&fm=26&gp=0.jpg"
  },
  bannerSort: [
    {
      txt: "买二付一",
      src:
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4001189223,2524281611&fm=26&gp=0.jpg"
    },
    {
      txt: "真材实料",
      src:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=262786171,152747083&fm=26&gp=0.jpg"
    },
    {
      txt: "会员福利",
      src:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4029083936,1399672192&fm=26&gp=0.jpg"
    },
    {
      txt: "银行活动",
      src:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1396706202,1074656045&fm=26&gp=0.jpg"
    },
    {
      txt: "实木家具",
      src:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=440255889,66482693&fm=26&gp=0.jpg"
    },
    {
      txt: "精品无疑",
      src:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1374312818,1296150264&fm=26&gp=0.jpg"
    },
    {
      txt: "红木家具",
      src:
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1632708423,1178888927&fm=26&gp=0.jpg"
    },
    {
      txt: "中式家具",
      src:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3910499157,2533047420&fm=26&gp=0.jpg"
    }
  ],
  noticeBar: [
    "营业资质公示，详情请点击查询",
    "配送公告",
    "家具活动，上不封顶，买够4万元送4千！",
    "营业资质公示，详情请点击查询",
    "配送公告",
     "家具活动，上不封顶，买够4万元送4千！",
  ]
};

export default {
  name: "home",
  data() {
    return {
      images: mock.swipe,
      firstBanner: mock.firstBanner.src,
      Sort: mock.bannerSort,
      NoticeBar: mock.noticeBar,
      isLoading: false
    };
  },
  methods: {
    tiaozhuanhandle(){
      this.$router.push({
        name:'sort'
      })
    },
    onSearch() {
      /* 搜索的路由 */
      this.$eventBus.$emit("mainNavActive", "sort");
      this.$router.push({
        name: "sort"
      });
    },

    onClickLeft() {
      /* top nav left */
      Toast("城市");
    },

    onClickRight() {
      /* top nav left */
      Toast("搜索");
    },

    onRefresh() {
      /* 下拉刷新 */
      setTimeout(() => {
        // get('http://47.104.244.134:8080/cartlist.do?token=3705')
        // .then(res=>{
        //   this.goods=res.data
        this.$toast({
          duration: 1000,
          message: "刷新成功"
        });
        this.isLoading = false;
        // })
        // .catch(err=>{
        //   this.$toast.fail('刷新失败')
        // })
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.changechicun{
  width:414px;
  height:260px;
}
.van-nav-bar{
  color: #fff;
  background: linear-gradient(90deg, #36db84, #0eb27b);
  .van-nav-bar__title {
    margin: 0 auto;
    width: 85%;
    max-width: 85%;
    color: #323233;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    right: 5px;
    .van-search {
      padding: 6px 10px;
    }
  }
}
.van-pull-refresh {
  margin-top: 46px;
}
img {
  max-width: 100%;
}
.imgSli {
  .van-swipe__indicators {
    bottom: 25px;
    .van-swipe__indicator {
      background-color: #fafafa;
    }
  }
  .van-swipe {
    .van-swipe-item {
      img {
        max-width: 100%;
        display: block;
        box-sizing: border-box;
        background-color: white;
        pointer-events: none;
      }
    }
  }
}
.homeSort {
  .van-row {
    .van-col {
      text-align: center;
      font-size: 12px;
      padding-bottom: 16px;
      img {
        width: 54px;
      }
    }
  }
}
.noticeSlide {
  .van-swipe {
    height: 40px;
  }
}
.first-screen{
  margin-bottom:30px;
  margin-top:20px;
}
.firstbanner{
  width:414px;
  height:145px;
  border-radius:60px;
}
.sort{
height:50px;}
</style>
