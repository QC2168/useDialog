<template>
  <Dialog
    :before-close="customClose"
    @confirm="confirm"
    v-model="visible"
    :title="mode == MODE.ADD ? '添加数据' : '编辑信息'"
    :confirm-text="mode == MODE.ADD ? '添加' : '修改'"
  >
    <el-form
      label-width="100px"
      :model="formData"
      ref="formDataRef"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="formData.age" />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formData.mobile" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>
<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { Ref, ref } from "vue";
import Dialog from "./Dialog.vue";
import { MODE } from "./types";
import useDialogWithForm from "./useDialogWithForm";

const rules = {
  name: {
    type: "string",
    required: true,
    pattern: /^[a-z]+$/,
    trigger: "change",
    message: "只能是英文名称哦",
    transform(value: string) {
      return value.trim();
    },
  },
  age: {
    type: "string",
    required: true,
    pattern: /^[0-9]+$/,
    trigger: "change",
    message: "年龄只能是数字哦",
    transform(value: string) {
      return value.trim();
    },
  },
  mobile: {
    type: "string",
    required: true,
    pattern:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    trigger: "change",
    message: "请输入正确的手机号码",
    transform(value: string) {
      return value.trim();
    },
  },
};

interface FromDataType {
  name: string;
  age: string;
  mobile: string;
}

const formDataRef = ref<FormInstance | null>(null);

let formData = ref<FromDataType>({
  name: "",
  age: "",
  mobile: "",
});

const { visible, closeDialog, openDialog, mode } = useDialogWithForm(
  formDataRef as Ref<FormInstance>
);
const confirm = () => {
  if (!formDataRef.value) return;
  formDataRef.value.validate((valid) => {
    if (valid) {
      console.log("confirm");
      ElMessage({
        message: "提交成功",
        type: "success",
      });
      closeDialog();
    }
  });
};

const customClose = () => {
  ElMessage({
    message: "取消提交",
    type: "info",
  });
  closeDialog();
};
defineExpose({
  closeDialog,
  openDialog,
});
</script>
<style lang="less" scoped></style>
