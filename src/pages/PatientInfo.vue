<template>
  <div class="patient-info-layout">
    <el-container>
      <el-header class="patient-info-header">
        <div>
          <span>病人姓名：</span>
          <el-input v-model="inputPatientName"></el-input>
          <span>医生姓名：</span>
          <el-input v-model="inputDoctorName"></el-input>
          <el-button @click="searchPatientInfo()"> 查询 </el-button>
        </div>
        <div class="right-header">
          <el-button type="primary" size="large" @click="addPatientInfo()">
            新增病人信息
          </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table class="patient-info-table" :data="showList">
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
            prop="gender"
            label="性别"
            width="80"
            align="center"
          />
          <el-table-column prop="age" label="年龄" width="60" align="center" />
          <el-table-column
            prop="patientTel"
            label="电话"
            width="150"
            align="center"
          />
          <el-table-column
            prop="roomNum"
            label="房间号"
            width="70"
            align="center"
          />
          <el-table-column
            prop="result"
            label="诊断结果"
            width="250"
            align="center"
          />
          <el-table-column
            prop="doctorName"
            label="医生姓名"
            width="150"
            align="center"
          />
          <el-table-column
            prop="department"
            label="科室"
            width="120"
            align="center"
          />
          <el-table-column label="操作">
            <template #default>
              <el-button type="primary" size="small" @click="EditPatientInfo()"
                >编辑</el-button
              >
              <el-button type="primary" size="small" @click="getPatientDetail()"
                >详细信息</el-button
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
import { ref } from 'vue'

const inputPatientName = ref('')
const inputDoctorName = ref('')
const searchPatientName = ref('')
const searchDoctorName = ref('')

const dataList = [
  {
    patientNum: 1,
    patientName: '胖子',
    gender: '男',
    age: 24,
    patientTel: '1145141919810',
    roomNum: 1,
    result: '过于可爱',
    doctorName: '欧晓浚',
    department: '精神科'
  }
]

var showList = computed(() => {
  return dataList.filter((obj) => {
    return (
      String(obj.patientName).indexOf(searchPatientName.value) > -1 &&
      String(obj.doctorName).indexOf(searchDoctorName.value) > -1
    )
  })
})

function getPatientInfo() {}

function searchPatientInfo() {
  searchPatientName.value = inputPatientName.value
  searchDoctorName.value = inputDoctorName.value
}

function addPatientInfo() {}

function EditPatientInfo() {}

function getPatientDetail() {}
</script>

<style lang="less" scoped>
.patient-info-header {
  display: flex;
  align-items: center;
}

.right-header {
  margin-left: auto;
}

.el-input {
  width: 200px;
  height: 50%;
  margin: 10px;
}
</style>
