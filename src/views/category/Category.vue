<template>
  <div class="category">
    <Header></Header>
    <div class="listWrapper" v-if="!showLoading">
      <div class="leftWrapper">
        <ul class="wrapper">
          <li class="categoryItem" v-for="(item,index) in categoriesData" :key="item.id"
          :class="{selected : currentIndex === index}"
          @click='clickLeftLi(index)'
          ref="menuList"
          >
            <span class="textWrapper">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <ContentView :categoriesDetailData="categoriesDetailData" />
    </div>
    <van-loading
      v-else
      type="spinner"
      color="#75a342"
      style="position:absolute ;left :50%;top:40%;transform:translate(-50%)"
    >YBY正在拼命加载中。。。</van-loading>
  </div>
</template>

<script>
import Header from "./components/Header";
import ContentView from './components/ContentView'
import BScroll from "better-scroll";
import { getCategories, getCategoriesDetail } from "@/service/api/index";
export default {
  name: "Category",
  data() {
    return {
      showLoading: true,
      categoriesData: [],
      categoriesDetailData: [],
      currentIndex: 0
    };
  },
  components: {
    Header,
    ContentView,
  },
  methods: {
    async initData() {
      let leftRes = await getCategories();
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate;
      }
      console.log(this.categoriesData);
      let rightRes = await getCategoriesDetail("/lk001");
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate;
      }
      this.showLoading = false;
      this.$nextTick(() => {
         this.leftScroll = new BScroll(".leftWrapper", { probeType: 3 });
         this.leftScroll.refresh()
      });
      // console.log(this.categoriesDetailData);
    },
    async clickLeftLi(index){
        this.currentIndex=index       
        let menuLists=this.$refs.menuList
        let el=menuLists[index]
        console.log(el) 
        this.leftScroll.scrollToElement(el,300)
        let rightRes = await getCategoriesDetail(`/lk00${index+1}`);
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate;
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='less' scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.listWrapper {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
  margin-bottom: 5rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 1px #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 1px solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>