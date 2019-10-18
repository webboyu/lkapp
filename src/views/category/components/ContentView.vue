<template>
  <div class="wrapper emptyWrapper">
    <div v-for="(item,index) in categoriesDetailData" :key="item.id">
      <div class="categoryTitle" style="top: 0">
        {{item.name}}
        <span @click="priceUp(index)">价格</span>
      </div>
      <ProductItem :products="item.products" />
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  name: "ContentView",
  data() {
    return {
      cc: true
    };
  },
  props: {
    categoriesDetailData: Array
  },
  components: {
    ProductItem
  },
  methods: {
    priceUp(index) {
      // console.log(this.categoriesDetailData[index].products)
      var aa = this.categoriesDetailData[index].products; // 按价格排序存的参数
    //   console.log(bb)

        for (var i = 0; i < aa.length - 1; i++) {
          for (var j = 0; j < aa.length - 1 - i; j++) {
            // console.log(aa[j].price)
            if (Number(aa[j].price) > Number(aa[j + 1].price)) {
              var temp = aa[j];
              aa[j] = aa[j + 1];
              aa[j + 1] = temp;
            }
          }
        }

         this.$set(this.categoriesDetailData[index].products, aa);
     
    }
  }
};
</script>

<style scoped>
.wrapper {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

.wrapper {
  position: absolute;
  left: 5.3125rem;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
}

.categoryTitle {
  padding: 0 0.3125rem;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  background: #f8f8f8;
  color: #666666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>