<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import ChinaJSON from '../data/china.json'
import type { EChartsOption } from 'echarts'
interface IProps {
  option: EChartsOption
}
echarts.registerMap('china', ChinaJSON as any)
const props = defineProps<IProps>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const ecahrtInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => ecahrtInstance.setOption(props.option))

  window.addEventListener('resize', function () {
    ecahrtInstance.resize()
  })
})
onMounted(() => {})
</script>

<style lang="less" scoped>
.base-echart {
  color: skyblue;
}
.echart {
  height: 300px;
}
</style>
