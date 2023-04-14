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
            width="90"
            align="center"
          />
          <el-table-column
            prop="patientName"
            label="姓名"
            width="110"
            align="center"
          />
          <el-table-column
            prop="blood"
            label="血液检查"
            width="120"
            align="center"
          />
          <el-table-column
            prop="bloodPressure"
            label="血压检查"
            width="120"
            align="center"
          />
          <el-table-column
            prop="ct"
            label="CT检查"
            width="120"
            align="center"
          />
          <el-table-column
            prop="xray"
            label="X光检查"
            width="120"
            align="center"
          />
          <el-table-column
            prop="shit"
            label="粪便分析"
            width="120"
            align="center"
          />
          <el-table-column
            prop="ecg"
            label="心电图"
            width="120"
            align="center"
          />
          <el-table-column
            prop="created_at"
            label="诊断时间"
            width="200"
            align="center"
          />
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button @click="changeCheck(scope.row)">修改</el-button>
              <el-button
                type="danger"
                @click="deleteCheckRow(scope.row.patientNum)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogVisible" title="检查情况" width="42%">
    <el-form label-width="65px" :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="updatePatientName" disabled />
      </el-form-item>
      <el-form-item label="病例号">
        <el-input v-model="updatePatientNum" disabled />
      </el-form-item>
      <el-form-item label="血液检查">
        <el-radio-group v-model="updateBlood">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="血压检查">
        <el-radio-group v-model="updateBloodPressure">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="CT检查">
        <el-radio-group v-model="updateCt">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="X光检查">
        <el-radio-group v-model="updateXray">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="粪便分析">
        <el-radio-group v-model="updateShit">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="心电图">
        <el-radio-group v-model="updateEcg">
          <el-radio :label="true">已完成</el-radio>
          <el-radio :label="false">未完成</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click=";(dialogVisible = false), updateCheck()"
          size="large"
        >
          数据更新
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref, toRefs, watch } from 'vue'
import { format } from '../utils/format-time'
import { ElMessage } from 'element-plus'
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
let showData = [
  {
    patientNum: 1,
    blood: true,
    xray: true,
    ct: true,
    ecg: false,
    bloodPressure: true,
    shit: false
  },
  {
    patientNum: 2,
    blood: true,
    xray: true,
    ct: true,
    ecg: false,
    bloodPressure: true,
    shit: false
  },
  {
    patientNum: 3,
    blood: true,
    xray: true,
    ct: true,
    ecg: false,
    bloodPressure: true,
    shit: false
  }
]

let showList = showData
// onMounted(async () => {
//   medicineData = await getMedicineList()
//   for (let i in medicineData) {
//     medicineData[i].created_at = format(medicineData[i].created_at) // 去掉时间，保留日期
//   }
//   showList = medicineData
//   updateKey.value = !updateKey.value
// })

function searchPatientInfo() {
  searchPatientNum.value = inputPatientNum.value
  searchPatientName.value = inputPatientName.value
}

watch([searchPatientNum, searchPatientName], () => {
  showList = showData.filter((obj) => {
    return (
      String(obj.patientNum).indexOf(searchPatientNum.value) > -1 &&
      String(obj.patientName).indexOf(searchPatientName.value) > -1
    )
  })
  updateKey.value = !updateKey.value
})

let dialogVisible = ref(false)
let updatePatientNum = ref(0)
let updatePatientName = ref('')
let updateBlood = ref(false)
let updateBloodPressure = ref(false)
let updateCt = ref(false)
let updateEcg = ref(false)
let updateShit = ref(false)
let updateXray = ref(false)
const changeCheck = (data) => {
  updatePatientNum.value = data.patientNum
  updatePatientName.value = data.patientName
  updateBlood.value = data.blood
  updateBloodPressure.value = data.bloodPressure
  updateCt.value = data.ct
  updateEcg.value = data.ecg
  updateShit.value = data.shit
  updateXray.value = data.xray

  dialogVisible.value = !dialogVisible.value
}

// 更新接口
const updateCheck = async () => {
  let upCheckData = {
    patientNum: updatePatientNum.value,
    blood: updateBlood.value,
    xray: updateXray.value,
    ct: updateCt.value,
    ecg: updateEcg.value,
    bloodPressure: updateBloodPressure.value,
    shit: updateShit.value
  }
  await updateCheckInfo(upCheckData).then((res) => {
    if (res.status === 'success') {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    }
  })
}

const deleteCheckRow = async (patientNumber) => {
  // await deleteCheckInfo()
  await deleteCheckInfo({ patientNum: patientNumber }).then((res) => {
    console.log(res)
    if (res.status === 'success') {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '没有该病例的检查情况',
        type: 'warning'
      })
    }
  })
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
  margin-left: 20px;
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
  height: 60%;
  margin: 10px;
}

.el-radio-group {
  margin-left: 10px;
}
</style>
