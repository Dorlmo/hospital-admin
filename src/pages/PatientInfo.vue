<template>
  <div>
    <el-container>
      <el-header class="patient-info-header">
        <div>
          <span>病人姓名：</span>
          <el-input class="short-input" v-model="inputPatientName"></el-input>
          <span>医生姓名：</span>
          <el-input class="short-input" v-model="inputDoctorName"></el-input>
          <el-button @click="searchPatientInfo()"> 查询 </el-button>
        </div>
        <div class="right-header">
          <el-button type="primary" size="large" @click="openAddPage()">
            新增病人信息
          </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table class="patient-info-table" :data="showList">
          <el-table-column prop="patientNum" label="病例号" width="100" align="center" />
          <el-table-column prop="patientName" label="姓名" width="120" align="center" />
          <el-table-column prop="gender" label="性别" width="80" align="center" />
          <el-table-column prop="age" label="年龄" width="60" align="center" />
          <el-table-column prop="patientTel" label="电话" width="150" align="center" />
          <el-table-column prop="roomNum" label="房间号" width="70" align="center" />
          <el-table-column prop="result" label="诊断结果" width="250" align="center" />
          <el-table-column prop="doctorName" label="医生姓名" width="150" align="center" />
          <el-table-column prop="department" label="科室" width="120" align="center" />
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button type="primary" size="small" @click="openEditPage(scope.row)">编辑</el-button>
              <el-button type="primary" size="small" @click="openDetailPage(scope.row)">详细信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog v-model="addDialogVisible" title="新增病人信息" width="50%">
      <el-form label-position="right" label-width="100px" :model="newPatient" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="newPatient.patientName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="newPatient.gender" placeholder="选择">
                <el-option label="男" value="male" />
                <el-option label="女" value="female" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄">
              <el-input v-model="newPatient.age" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="newPatient.patientTel" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间号">
              <el-input v-model="newPatient.roomNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="诊断结果">
          <el-input v-model="newPatient.result" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button type="primary" @click="addPatientInfo()" size="large">
            保存
          </el-button>
          <el-button type="primary" @click="addDialogVisible = false" size="large">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" title="编辑信息" width="50%">
      <el-form label-position="right" label-width="100px" :model="modifyPatient" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="modifyPatient.patientName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="modifyPatient.gender" placeholder="选择">
                <el-option label="男" value="male" />
                <el-option label="女" value="female" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄">
              <el-input v-model="modifyPatient.age" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="modifyPatient.patientTel" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间号">
              <el-input v-model="modifyPatient.roomNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="诊断结果">
          <el-input v-model="modifyPatient.result" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button type="primary" @click="editSave()" size="large">
            保存
          </el-button>
          <el-button type="primary" @click="; (editDialogVisible = false)" size="large">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="detailDialogVisible" title="病例查看" width="50%">
      <el-form label-position="right" label-width="100px" :model="modifyPatient" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <span>{{ displayPatient.patientName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <span>{{ displayPatient.gender }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄">
              <span>{{ displayPatient.age }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <span>{{ displayPatient.patientTel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间号">
              <span>{{ displayPatient.roomNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="诊断结果" style="width: 100%">
          <span>{{ displayPatient.result }}</span>
        </el-form-item>
        <el-form-item label="药品选择" style="width: 100%">
          <div v-if="displayPatient.medication.size=0">
            <span>{{ displayPatient.medication }}</span>
          </div>
          <div v-else>
            <el-select v-model="displayPatient.medication" multiple placeholder="选择" style="width: 500px">
              <el-option v-for="item in medicineOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="检查项目">
          <div v-if="checkTableVisible">
            <el-form-item label="血液检查">
              <el-radio-group v-model="displayPatient.blood" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="血压检查">
              <el-radio-group v-model="displayPatient.bloodPressure" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="CT检查">
              <el-radio-group v-model="displayPatient.ct" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="X光检查">
              <el-radio-group v-model="displayPatient.xray" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="粪便分析">
              <el-radio-group v-model="displayPatient.shit" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="心电图">
              <el-radio-group v-model="displayPatient.ecg" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="血液检查">
              <el-radio-group v-model="displayPatient.blood">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="血压检查">
              <el-radio-group v-model="displayPatient.bloodPressure">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="CT检查">
              <el-radio-group v-model="displayPatient.ct">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="X光检查">
              <el-radio-group v-model="displayPatient.xray">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="粪便分析">
              <el-radio-group v-model="displayPatient.shit">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="心电图">
              <el-radio-group v-model="displayPatient.ecg">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <div v-if="!(medicationTableVisible.valueOf&&checkTableVisible.valueOf)">
            <el-button type="primary" @click="detailDialogVisible = false" size="large">
              确认
            </el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="editSave(displayPatient)" size="large">
              保存
            </el-button>
            <el-button type="primary" @click="detailDialogVisible = false" size="large">
              取消
            </el-button>
          </div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { reactive, ref } from 'vue'
import { medicineOptions } from '../utils/options'

const inputPatientName = ref('')
const inputDoctorName = ref('')
const searchPatientName = ref('')
const searchDoctorName = ref('')

var patient = {
  patientNum: '',
  patientName: '',
  age: '',
  gender: '',
  patientTel: '',
  roomNum: '',
  doctorName: '',
  result: '',
  medication: [],
  blood: false,
  xray: false,
  ct: false,
  ecg: false,
  bloodPressure: false,
  shit: false
}
const newPatient = reactive(Object.create(patient))
const modifyPatient = reactive(Object.create(patient))
const displayPatient = reactive(Object.create(patient))
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const medicationTableVisible = ref(true)
const checkTableVisible = ref(true)

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
    department: '精神科',
    medication: [],
    blood: false,
    xray: false,
    ct: false,
    ecg: false,
    bloodPressure: false,
    shit: false
  },
  {
    patientNum: 2,
    patientName: '123',
    gender: '男',
    age: 24,
    patientTel: '1145141919810',
    roomNum: 1,
    result: '过于可爱',
    doctorName: '欧晓浚',
    department: '精神科',
    medication: [],
    blood: false,
    xray: false,
    ct: false,
    ecg: false,
    bloodPressure: false,
    shit: false
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

function refreshDataList() {

}


function searchPatientInfo() {
  searchPatientName.value = inputPatientName.value
  searchDoctorName.value = inputDoctorName.value
}

function openAddPage(){
  for(let key in newPatient){
    newPatient[key]=''
  }
  addDialogVisible.value=true
}

const openEditPage = (data) => {
  for(let key in modifyPatient){
    modifyPatient[key]=data[key]
  }
  editDialogVisible.value = true
}

function openDetailPage(data) {
  var operateObject = dataList.find((element) => element.patientNum = data.patientNum)
  for(let key in displayPatient){
    displayPatient[key]=operateObject[key]
  }
  if(displayPatient.medication==[]){
    medicationTableVisible.value=false
  }
  console.log(medicationTableVisible.value)
  detailDialogVisible.value = true
}

function addPatientInfo() {
  addDialogVisible.value = true
}

function editSave(patient) {
  editDialogVisible.value = false
}

</script>

<style lang="less" scoped>
.patient-info-header {
  display: flex;
  align-items: center;
}

.right-header {
  margin-left: auto;
}

:deep(.el-form-item__label) {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
}

.el-textarea {
  width: 500px;
}

.short-input {
  width: 120px;
  height: 30px;
  margin: 10px;
}
</style>
