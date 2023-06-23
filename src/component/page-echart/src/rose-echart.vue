<template>
  <div class="rose-ecahrt">
    <baseEchart :option="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from './base-echart.vue'
import type { IEchartValueType } from '../types'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

interface IProps {
  roseData: IEchartValueType[]
}
const props = defineProps<IProps>()
const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '商品销量',
        type: 'pie',
        radius: [10, 160],
        center: ['50%', '50%'],
        roseType: 'area',
        bottom: '-35%',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: false
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.rose-ecahrt {
  color: skyblue;
}
</style>
