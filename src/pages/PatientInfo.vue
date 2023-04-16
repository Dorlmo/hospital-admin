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
          <el-table-column prop="depNum" label="部门号" width="120" align="center" />
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
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
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
              <el-select v-model="newPatient.roomNum" placeholder="选择">
                <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生">
              <el-select v-model="newPatient.doctorName" placeholder="选择">
                <el-option v-for="item in doctorOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门号">
              <el-select v-model="newPatient.depNum" placeholder="选择">
                <el-option v-for="item in depOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
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
              <el-select v-model="modifyPatient.roomNum" placeholder="选择">
                <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生">
              <el-select v-model="modifyPatient.doctorName" placeholder="选择">
                <el-option v-for="item in doctorOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门号">
              <el-select v-model="modifyPatient.depNum" placeholder="选择">
                <el-option v-for="item in depOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <span>{{ displayPatient.patient.patientName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <span>{{ displayPatient.patient.gender }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄">
              <span>{{ displayPatient.patient.age }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <span>{{ displayPatient.patient.patientTel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房间号">
              <span>{{ displayPatient.patient.roomNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="医生">
              <span>{{ displayPatient.patient.doctorName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门号">
              <span>{{ displayPatient.patient.roodepNummNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="诊断结果" style="width: 100%">
          <span>{{ displayPatient.patient.result }}</span>
        </el-form-item>
        <el-form-item label="药品选择" style="width: 100%">
          <div v-if="medicationTableVisible&&medicationSave">
            <span>{{ displayPatient.patient_medication[0].prescriptionArray }}</span>
          </div>
          <div v-else-if="medicationSave">
            <el-button type="primary" @click="medicationSave=false">编辑</el-button>
          </div>
          <div v-else>
            <el-select v-model="displayPatient.patient_medication[0].prescriptionArray" multiple placeholder="选择" style="width: 500px">
              <el-option v-for="item in medicineOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" @click="updateMedication()">保存</el-button>
          </div>
        </el-form-item>
        <el-form-item label="检查项目">
          <div v-if="diagnosticTableVisble&&diagnosticSave">
            <el-form-item label="血液检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].blood" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="血压检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].bloodPressure" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="CT检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].ct" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="X光检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].xray" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="粪便分析">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].shit" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="心电图">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].ecg" disabled>
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-else-if="diagnosticSave">
            <el-button type="primary" @click="diagnosticSave=false">编辑</el-button>
          </div>
          <div v-else>
            <el-form-item label="血液检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].blood">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="血压检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].bloodPressure">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="CT检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].ct">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="X光检查">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].xray">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="粪便分析">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].shit">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="心电图">
              <el-radio-group v-model="displayPatient.patient_diagnostic[0].ecg">
                <el-radio :label="true">已完成</el-radio>
                <el-radio :label="false">未完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-button type="primary" @click="updateDiagnostic()">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button type="primary" @click="detailDialogVisible = false" size="large">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, reactive, ref } from 'vue'
import { depOption, doctorOptions, medicineOptions, roomOptions } from '../utils/options'
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

var patientInfo = {
  patientNum: '',
  patientName: '',
  age: '',
  gender: '',
  patientTel: '',
  roomNum: '',
  doctorName: '',
  depNum: '',
  result: '',
  patient_medication:[],
  patient_diagnostic:[{
    blood: false,
    bloodPressure: false,
    ct: false,
    ecg: false,
    shit: false,
    xray: false,
  }]
}

const dataList = ref([])
const inputPatientName = ref('')
const inputDoctorName = ref('')
const searchPatientName = ref('')
const searchDoctorName = ref('')
const newPatient = reactive(Object.create(patientInfo))
const modifyPatient = reactive(Object.create(patientInfo))
const displayPatient = reactive({
  patient_diagnostic:[{
    blood: false,
    bloodPressure: false,
    ct: false,
    ecg: false,
    shit: false,
    xray: false,
  }],
  patient:{
    patientNum: '',
    patientName: '',
    age: '',
    gender: '',
    patientTel: '',
    roomNum: '',
    doctorName: '',
    result: '',
    depNum: '',
  },
  patient_medication:[{
    prescriptionArray:[],
  }]
})
const editDialogVisible = ref(false)
const addDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const medicationTableVisible = computed(()=>{
  return displayPatient.patient_medication[0].prescriptionArray.length!=0
})
const diagnosticTableVisble = computed(()=>{
  for(let key in displayPatient.patient_diagnostic[0]){
    let obj=displayPatient.patient_diagnostic[0]
    if(obj[key]==true){
      return true
    }
  }
  return false
})
const medicationSave = ref(true)
const diagnosticSave = ref(true)


var showList = computed(() => {
  return dataList.value.filter((obj) => {
    return (
      String(obj.patientName).indexOf(searchPatientName.value) > -1 &&
      String(obj.doctorName).indexOf(searchDoctorName.value) > -1
    )
  })
})

onMounted(()=>{
  initFn()
})

const initFn = async () => {
  refreshData()
}

const getPatientDetail = async(patientNum)=>{
  let res = await getPatientById(patientNum)
  let patient = res.data.patient
  let patient_medication = []
  let patient_diagnostic = []
  if(typeof res.data.patient_medication[0] === 'undefined'){
    patient_medication.push({prescriptionArray:[]})
  }
  else{
    patient_medication = res.data.patient_medication
  }
  if(typeof res.data.patient_diagnostic[0] === 'undefined'){
    patient_diagnostic.push({
      blood: false,
    bloodPressure: false,
    ct: false,
    ecg: false,
    shit: false,
    xray: false,
    })
  }
  else{
    patient_diagnostic = res.data.patient_diagnostic
  }
  let patientDetail = { patient , patient_medication , patient_diagnostic}
  for(let key in patientDetail){
    displayPatient[key]=patientDetail[key]
  }
}

async function refreshData(){
  dataList.value = (await getPatientList()).patientList
}

function searchPatientInfo() {
  searchPatientName.value = inputPatientName.value
  searchDoctorName.value = inputDoctorName.value
}

function openAddPage(){
  addDialogVisible.value=true
}

const openEditPage = (data) => {
  for(let key in modifyPatient){
    modifyPatient[key]=data[key]
  }
  editDialogVisible.value = true
}

function openDetailPage(data) { 
  getPatientDetail(data.patientNum)
  console.log(displayPatient)
  medicationSave.value = true
  diagnosticSave.value = true
  detailDialogVisible.value = true
}

async function addPatientInfo() {
  let maxNum = 1
  let length = dataList.value.length
  for(let i = 0;i<length;i++){
    if(dataList.value[i].patientNum>maxNum)
    maxNum = dataList.value[i].patientNum
  }
  maxNum++
  await addPatient(
    newPatient.patientName,
    newPatient.age, 
    newPatient.gender,
    maxNum,
    newPatient.patientTel,
    newPatient.roomNum,
    newPatient.doctorName,
    newPatient.result,
    newPatient.depNum
  )
  addDialogVisible.value = false
  refreshData()
}

function updateMedication() {
  let data = {
    patientNum:displayPatient.patient.patientNum,
    medication:displayPatient.patient_medication[0].prescriptionArray
  }
  console.log(displayPatient.patient_medication[0].prescriptionArray)
  createMedicine(data)
  medicationSave.value = true
}

function updateDiagnostic(){
  let data = {
    patientNum: displayPatient.patient.patientNum,
    blood: displayPatient.patient_diagnostic[0].blood,
    xray: displayPatient.patient_diagnostic[0].xray,
    ct: displayPatient.patient_diagnostic[0].ct,
    ecg: displayPatient.patient_diagnostic[0].ecg,
    bloodPressure: displayPatient.patient_diagnostic[0].bloodPressure,
    shit: displayPatient.patient_diagnostic[0].shit
  }
  createCheck(data)
  diagnosticSave.value = true
}

function editSave() {
  updatePatientInfo(
  modifyPatient.patientName,
  modifyPatient.age,
  modifyPatient.gender,
  modifyPatient.patientNum,
  modifyPatient.patientTel,
  modifyPatient.roomNum,
  modifyPatient.doctorName,
  modifyPatient.result
)
  editDialogVisible.value = false
  refreshData()
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
