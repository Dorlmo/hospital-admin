<template>
  <el-dialog
    class="edit-patient-info"
    v-model="dialogVisible"
    title="Tips"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>

</script>

<style>
.edit-patient-info{
    width: 50%;
}
</style>