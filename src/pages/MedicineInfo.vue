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
            width="120"
            align="center"
          />
          <el-table-column
            prop="doctorName"
            label="医生姓名"
            width="150"
            align="center"
          />
          <el-table-column
            prop="result"
            label="诊断结果"
            width="270"
            align="center"
          />
          <el-table-column
            prop="prescriptionArray"
            label="处方单"
            width="330"
            align="center"
          />
          <el-table-column
            prop="created_at"
            label="诊断时间"
            width="200"
            align="center"
            sortable
          />
          <el-table-column label="操作" align="center" width="100">
            <template v-slot="scope">
              <el-button @click="change(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogVisible" title="处方信息" width="40%">
    <el-form label-width="68px" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名" prop="">
        <el-input v-model="updatePatientName" disabled />
      </el-form-item>
      <el-form-item label="病例号">
        <el-input v-model="updatePatientNum" disabled />
      </el-form-item>
      <el-form-item label="药品选择"
        ><el-select
          v-model="selectData"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /> </el-select
      ></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click=";(dialogVisible = false), updateMedicine()"
          size="large"
        >
          更新处方
        </el-button>
      </span>
    </template>
  </el-dialog>
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

onMounted(async () => {
  medicineData = await getMedicineList()
  for (let i in medicineData) {
    medicineData[i].created_at = format(medicineData[i].created_at) // 去掉时间，保留日期
  }
  showList = medicineData
  updateKey.value = !updateKey.value
})

function searchPatientInfo() {
  searchPatientNum.value = inputPatientNum.value
  searchPatientName.value = inputPatientName.value
}

watch([searchPatientNum, searchPatientName], () => {
  showList = medicineData.filter((obj) => {
    return (
      String(obj.patientNum).indexOf(searchPatientNum.value) > -1 &&
      String(obj.patientName).indexOf(searchPatientName.value) > -1
    )
  })
  updateKey.value = !updateKey.value
})

let dialogVisible = ref(false)
let updatePatientNum = ref('')
let updatePatientName = ref('')
let updateDoctorName = ref('')
const change = (data) => {
  updatePatientNum.value = data.patientNum
  updatePatientName.value = data.patientName
  console.log(data)
  dialogVisible.value = !dialogVisible.value
}

let selectData = ref([])
const options = [
  {
    value: '布洛芬',
    label: '布洛芬'
  },
  {
    value: '吗啡',
    label: '吗啡'
  },
  {
    value: '维c银翘片',
    label: '维c银翘片'
  },
  {
    value: '藿香正气水',
    label: '藿香正气水'
  },
  {
    value: '云南白药',
    label: '云南白药'
  },
  {
    value: '黄霉素',
    label: '黄霉素'
  },
  {
    value: '褪黑素',
    label: '褪黑素'
  },
  {
    value: '咳特灵',
    label: '咳特灵'
  }
]

const updateMedicine = () => {
  let medicineArray = Array.from(selectData.value)
  console.log(medicineArray)
  dialogVisible.value = !dialogVisible.value
}
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
