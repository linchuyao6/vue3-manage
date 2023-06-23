<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="8" :xs="24" :sm="12" :md="8" :lg="6">
          <countCard v-bind="item"></countCard>
        </el-col>
      </template>
    </el-row>
    <!-- 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chartCard :header="'商品个数'">
          <pieEchart :pie-data="showGoodsCategoryCount"></pieEchart>
        </chartCard>
      </el-col>
      <el-col :span="10">
        <chartCard :header="'全国销量'">
          <mapEchart :map-data="showGoodsAddressSale"></mapEchart>
        </chartCard>
      </el-col>
      <el-col :span="7">
        <chartCard :header="'商品销量'">
          <roseEchart :rose-data="showGoodsCategorySale"></roseEchart>
        </chartCard>
      </el-col>
    </el-row>

    <!-- 底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chartCard :header="'商品分类销量'">
          <lineEchart
            :labels="GoodsCategorySaleLabels.lables"
            :values="GoodsCategorySaleLabels.values"
          ></lineEchart>
        </chartCard>
      </el-col>
      <el-col :span="12">
        <chartCard :header="'商品收藏'">
          <barEchart
            :labels="showGoodsCategoryFavor.labels"
            :value="showGoodsCategoryFavor.value"
          ></barEchart>
        </chartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import useAnalysisStore from '@/stores/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import pieEchart from '@/component/page-echart/src/pie-echart.vue'
import roseEchart from '@/component/page-echart/src/rose-echart.vue'
import lineEchart from '@/component/page-echart/src/line-echart.vue'
import barEchart from '@/component/page-echart/src/bar-echart.vue'
import mapEchart from '@/component/page-echart/src/map-echart.vue'
import { computed, watch } from 'vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
const {
  amountList,
  goodsCategoryCount,
  goodsAddressSale,
  goodsCategoryFavor,
  goodsCategorySale
} = storeToRefs(analysisStore)

// 饼图数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
// 玫瑰图
const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,

    value: item.goodsCount
  }))
})
//线性图

const GoodsCategorySaleLabels = computed(() => {
  const lables = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { lables, values }
})

// 柱状图
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const value = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, value }
})
// 地图数据
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
watch(showGoodsCategorySale, (value) => {
  console.log(value)
  console.log(goodsCategorySale.value)
})
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
