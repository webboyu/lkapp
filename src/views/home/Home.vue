<template>
  <div class="home">
    <div v-if="!showLoading">
      <Header></Header>
      <Sowing :sowing_list="sowing_list" />
      <Nav :nav_list="nav_list"></Nav>
      <!-- 秒杀 -->
      <FlashSale :flash_sale_product_list="flash_sale_product_list" />
      <YouLike :you_like_product_list="you_like_product_list" />
      <MarkPage v-if="showBackStatus" :scrollToTop="scrollToTop" />
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
import { getHomeData } from "@/service/api/index";
import Header from "./components/header/Header";
import Sowing from "./components/sowing/Sowing";
import Nav from "./components/nav/Nav";
import FlashSale from "./components/flashSale/FlashSale";
import YouLike from "./components/youLike/YouLike";
import MarkPage from "./components/markPage/MarkPage";
import { showBack, animate } from "@/config/global";

import PubSub from "pubsub-js";

import { mapMutations } from "vuex";

import { Toast } from 'vant';

export default {
  name: "Home",
  data() {
    return {
      sowing_list: [],
      nav_list: [],
      flash_sale_product_list: [],
      you_like_product_list: [],
      showLoading: true,
      showBackStatus: false
    };
  },
  components: {
    Header,
    Sowing,
    Nav,
    FlashSale,
    YouLike,
    MarkPage
  },
  created() {
    this.reqData();
    // getHomeData()
    //   .then(res => {
    //     console.log(res);
    //     if (res.success) {
    //       this.sowing_list = res.data.list[0].icon_list;
    //       this.nav_list = res.data.list[2].icon_list;
    //       this.flash_sale_product_list = res.data.list[3].product_list;
    //       this.you_like_product_list = res.data.list[12].product_list;
    //       this.showLoading = false;
    //       showBack((status)=>{
    //         // console.log(status)
    //         this.showBackStatus=status
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  methods: {
    ...mapMutations(["ADD_GOODS"]),
    async reqData() {
      let res = await getHomeData();
      if (res.success) {
        this.sowing_list = res.data.list[0].icon_list;
        this.nav_list = res.data.list[2].icon_list;
        this.flash_sale_product_list = res.data.list[3].product_list;
        this.you_like_product_list = res.data.list[12].product_list;
        this.showLoading = false;
        showBack(status => {
          // console.log(status)
          this.showBackStatus = status;
        });
      }
    },
    scrollToTop() {
      let docB = document.documentElement || document.body;
      animate(docB, { scrollTop: 0 }, 400, "ease-out");
    }
  },
  mounted() {
    PubSub.subscribe("homeAddToCart", (msg, goods) => {
      if (msg === "homeAddToCart") {
        this.ADD_GOODS({
          goodsId:goods.id,
          goodsName:goods.name,
          smallImage:goods.small_image,
          goodsPrice:goods.price
        });
      }
      Toast( {
        message:'添加到购物车成功',
        duration:1000
      } )
    });
  }
};
</script>

<style lang='less' scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>