import service from '../service/axios'

// 登录接口
export function login(username, password) {
  return service({
    method: 'post',
    url: '/login',
    params: {
      username,
      password
    }
  }).then((res) => {
    return res.data
  })
}

// 添加新病人信息
export function addPatient(
  patientName,
  age,
  gender,
  patientId,
  patientTel,
  roomNum,
  doctorName,
  result,
  depNum
) {
  return service({
    method: 'post',
    url: '/addPatientInfo',
    params: {
      patientName,
      age,
      gender,
      patientId,
      patientTel,
      roomNum,
      doctorName,
      result,
      depNum
    }
  }).then((res) => {
    console.log(res)
  })
}

// 获取病人列表接口(有问题)
export function getPatientList() {
  return service({
    method: 'get',
    url: '/patient/list'
  }).then((res) => {
    return res.data
  })
}

// 根据id查找病人（有问题）
export function getPatientById(patientNum) {
  return service({
    method: 'post',
    url: '/patient/id',
    params: {
      patientNum
    }
  }).then((res) => {
    return res
  })
}

// 更新病人信息
export function updatePatientInfo(
  patientName,
  age,
  gender,
  patientNum,
  patientTel,
  roomNum,
  doctorName,
  result
) {
  return service({
    method: 'post',
    url: '/updatePatientInfo',
    params: {
      patientName,
      age,
      gender,
      patientNum,
      patientTel,
      roomNum,
      doctorName,
      result
    }
  }).then((res) => {
    console.log(res)
  })
}

// 获取处方列表接口
export function getMedicineList() {
  return service({
    method: 'get',
    url: '/medication/list'
  }).then((res) => {
    return res.data.medicationList
  })
}

// 创建处方
export function createMedicine(createData) {
  return service({
    method: 'post',
    url: '/medication/create',
    data: createData
  }).then((res) => {
    return res
  })
}

// 创建检查
export function createCheck(createData) {
  return service({
    method: 'post',
    url: '/diagnostic/create',
    data: createData
  }).then((res) => {
    return res
  })
}

// 更新检查信息
export function updateCheckInfo(checkData) {
  return service({
    method: 'post',
    url: '/diagnostic/modify',
    data: checkData
  }).then((res) => {
    return res.data
  })
}

// 删除检查信息
export function deleteCheckInfo(checkData) {
  return service({
    method: 'post',
    url: '/diagnostic/delete',
    data: checkData
  }).then((res) => {
    return res.data
  })
}
