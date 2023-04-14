<template>
  <div>
    <div class="medicine-header">
      <h2 class="medicine-title">处方信息</h2>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="input"
            placeholder="请输入关键字"
            :suffix-icon="Search"
            style="width: 180px"
            class="search-input"
          />
          <el-button round @click="action">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, toRefs } from 'vue'
import { reactive } from 'vue'
import {
  getMedicineList,
  addPatient,
  updatePatientInfo,
  getPatientList,
  getPatientById,
  createMedicine,
  createCheck,
  updateCheckInfo,
  deleteCheckInfo
} from '../service/api.js'

let input = ref('')

let patientName = ref('张张123')
let age = ref(18)
let gender = ref('男')
let patientId = ref(1234)
let patientTel = ref('+86-114514919810')
let roomNum = ref(212)
let doctorName = ref('東雪蓮Official')
let result = ref('asda')
let depNum = ref(200)
let patientNum = ref(1)

let medicineData = {
  patientNum: patientNum.value,
  medication: ['布洛芬', '吗啡', '维c银翘片', '藿香正气水', '云南白药']
}

let checkData = {
  patientNum: 3
  // blood: false,
  // xray: false,
  // ct: false,
  // ecg: false,
  // bloodPressure: true,
  // shit: false
}

const action = async () => {
  const ListData = await deleteCheckInfo(checkData)
  console.log(ListData)
}

onMounted(async () => {
  const res = await getMedicineList()
  console.log(res)
})
</script>

<style lang="less" scoped>
.medicine-header {
  margin-top: 20px;

  .medicine-title {
    margin-left: 20px;
  }

  .search-input {
    margin-left: 20px;
  }
}

:deep(.el-form-item__label) {
  height: 40px;
  line-height: 40px;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
}
</style>
