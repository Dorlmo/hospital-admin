<template>
  <div class="patient-info-layout">
    <el-container>
      <el-header class="patient-info-header">
        <div>
          <span>病例号</span>
          <el-input v-model="inputPatientNum"></el-input>
          <span>姓名</span>
          <el-input v-model="inputPatientName"></el-input>
          <el-button @click="searchPatientInfo()"> 查询 </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table class="patient-info-table" :data="showList" :key="updateKey">
          <el-table-column
            prop="patientNum"
            label="病例号"
            width="100"
            align="center"
          />
          <el-table-column
            prop="patientName"
            label="姓名"
            width="150"
            align="center"
          />
          <el-table-column
            prop="doctorName"
            label="医生姓名"
            width="100"
            align="center"
          />
          <el-table-column
            prop="result"
            label="诊断结果"
            max-width="350"
            align="center"
          />
          <el-table-column
            prop="prescriptionArray"
            label="处方单"
            max-width="300"
            align="center"
          />
          <el-table-column
            prop="created_at"
            label="诊断时间"
            max-width="200"
            align="center"
            sortable
          />
          <el-table-column label="操作" align="center" width="100">
            <template v-slot="scope">
              <el-button @click="change(scope.row)" type="warning"
                >出院</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref, toRefs, watch } from 'vue'
import { format } from '../utils/format-time'
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

const inputPatientNum = ref('')
const inputPatientName = ref('')
const searchPatientNum = ref('')
const searchPatientName = ref('')
const updateKey = ref(true)
let medicineData = []
let showList = []
let allDataArray = []
let timeArr = []

onMounted(async () => {
  medicineData = await getMedicineList()
  for (let i in medicineData) {
    medicineData[i].created_at = format(medicineData[i].created_at) // 去掉时间，保留日期
    const res = await getPatientById(medicineData[i].patientNum)
    allDataArray.push({ ...res.data.patient, ...medicineData[i] })
  }
  for (let i in allDataArray) {
    let patNum = allDataArray[i].patientNum
    if (timeArr.indexOf(patNum) !== -1) {
      let index = timeArr.indexOf(patNum)
      if (
        allDataArray[index].created_at > allDataArray[Number(i)].created_at ===
        false
      ) {
        allDataArray.splice(index, 1)
      }
    }
    timeArr.push(patNum)
  }
  showList = allDataArray
  updateKey.value = !updateKey.value
})

function searchPatientInfo() {
  searchPatientNum.value = inputPatientNum.value
  searchPatientName.value = inputPatientName.value
}

watch([searchPatientNum, searchPatientName], () => {
  showList = allDataArray.filter((obj) => {
    return (
      String(obj.patientNum).indexOf(searchPatientNum.value) > -1 &&
      String(obj.patientName).indexOf(searchPatientName.value) > -1
    )
  })
  updateKey.value = !updateKey.value
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
  height: 50px;
  line-height: 50px;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
}

.patient-info-header {
  display: flex;
  align-items: center;
}

.right-header {
  margin-left: auto;
}

.el-input {
  width: 150px;
  height: 50%;
  margin: 10px;
}
.el-select {
  margin-left: 20px;
}
</style>
