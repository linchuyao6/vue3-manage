import { defineStore } from 'pinia'
import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/services/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}
const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      const result1 = await getAmountListData()
      this.amountList = result1.data
      const result2 = await getGoodsAddressSale()
      this.goodsAddressSale = result2.data
      const result3 = await getGoodsCategoryCount()
      this.goodsCategoryCount = result3.data

      const result4 = await getGoodsCategoryFavor()
      this.goodsCategoryFavor = result4.data
      const result5 = await getGoodsCategorySale()
      this.goodsCategorySale = result5.data
    }
  }
})
export default useAnalysisStore
