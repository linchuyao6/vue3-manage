<template>
  <div class="pie-ecahrt">
    <baseEchart :option="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'
import type { IEchartValueType } from '../types'
import baseEchart from './base-echart.vue'
interface IProps {
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pie-ecahrt {
  color: skyblue;
}
</style>
