<template>
  <div class="sortbox">
    <van-search
      class="search"
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>
<script>
var items = [
  {
    // 导航名称
    text: "精选家具",
    // 该导航下所有的可选项
    children: [
      {
        text: "全部",
        id: 1
      },
      {
        text: "实木家具",
        id: 2
      },
      {
        text: "红木家具",
        id: 3
      },
      {
        text: "中式家具",
        id: 4
      },
      {
        text: "欧式家具",
        id: 5
      }
    ]
  },
  {
    text: "室内家具",
    children: [
      {
        text: "全部",
        id: 1
      },
      {
        text: "室外家具",
        id: 2
      },
      {
        text: "玄关家具",
        id: 3
      },
      {
        text: "厨房家具",
        id: 4
      },
      {
        text: "卧室家具",
        id: 5
      }
    ]
  },
  {
    text: "现代家具",
    children: [
      {
        text: "全部",
        id: 1
      },
      {
        text: "古典家具",
        id: 2
      },
      {
        text: "现代古典家具",
        id: 3
      },
      {
        text: "电视柜",
        id: 4
      },
      {
        text: "书柜",
        id: 5
      }
    ]
  },
  {
    text: "阳台家具",
    children: [
      {
        text: "全部",
        id: 1
      },
      {
        text: "阳台柜",
        id: 2
      },
      {
        text: "榻榻米",
        id: 3
      },
      {
        text: "地台柜",
        id: 4
      },
      {
        text: "洗衣柜",
        id: 5
      },
      {
        text: "鱼缸",
        id: 6
      },
      {
        text: "浴缸",
        id: 7
      },
      {
        text: "床头柜",
        id: 8
      },
      {
        text: "书桌椅",
        id: 9
      },
      {
        text: "儿童衣柜",
        id: 10
      },
      {
        text: "大芯板",
        id: 11
      },
      {
        text: "博古柜",
        id: 12
      }
    ]
  }
];
export default {
  data() {
    return {
      value: "",
      items,
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    };
  },
  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
      this.$router.push({
        name: "list",
        params: {
          title: data.text
        }
      });
    },
    onSearch() {}
  }
};
</script>
<style scoped>
.sortbox {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-tree-select {
  flex: 1;
  overflow: auto;
}
.van-tree-select__nav {
  font-size: 18px;
}
.van-tree-select__content {
  font-size: 16px;
  padding-bottom: 50px;
}
body {
  display: flex;
}
.van-tree-select__item {
  float: left;
  height: 30px;
  line-height: 30px;
  margin: 15px;
  padding: 5px 20px;
  background: rgba(200, 200, 200, 0.3);
  border-radius: 10px;
}
.van-tree-select__item i {
  display: none;
}
</style>
