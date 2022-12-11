<template>
  <div class="app">
    <el-space wrap>
      <el-button @click="openDialog1">普通弹窗</el-button>
      <el-button @click="openDialog2">可拖拽和可全屏的弹窗</el-button>
      <el-button @click="openDialog3">全屏和自定义页脚插槽弹窗</el-button>
      <el-button @click="openDialog4(MODE.ADD)">表单弹窗（新增）</el-button>
      <el-button @click="openDialog4(MODE.EDIT)">表单弹窗（编辑）</el-button>
    </el-space>
    <DialogCmp
      title="DialogCmp1"
      :hiddenFullBtn="true"
      v-model="visible1"
      @confirm="handleConfirm"
      @close="handleClose"
    >
      <h3>DialogCmp1</h3>
    </DialogCmp>
    <DialogCmp2
      draggable
      title="DialogCmp2"
      v-model="visible2"
      @confirm="closeDialog2"
      @close="closeDialog2"
    >
      <h3>DialogCmp2</h3>
    </DialogCmp2>
    <DialogCmp3
      draggable
      title="DialogCmp3"
      v-model="visible3"
      :fullscreen="true"
      :loading="loading3"
      @confirm="openDialog3"
      @close="closeDialog3"
    >
      <h3>DialogCmp3</h3>
      <template #footer>
        <el-button @click="openLoading3()">开启loading</el-button>
        <el-button @click="closeLoading3()">关闭loading</el-button>
        <el-button @click="showTimes()">当前时间</el-button>
        <el-button @click="closeDialog3">关闭</el-button>
      </template>
    </DialogCmp3>

    <formDialog ref="formDialogRef" />
  </div>
</template>
<script setup lang="ts">
import useDialog from "./components/useDialog";
import DialogCmp from "./components/Dialog.vue";
import DialogCmp2 from "./components/Dialog.vue";
import DialogCmp3 from "./components/Dialog.vue";
import formDialog from "./components/formDialog.vue";
import { ElButton, ElMessage } from "element-plus";
import { ref } from "vue";
import { MODE } from "./components/types";
const {
  visible: visible1,
  openDialog: openDialog1,
  closeDialog: closeDialog1,
} = useDialog();
const {
  visible: visible2,
  openDialog: openDialog2,
  closeDialog: closeDialog2,
} = useDialog();
const {
  visible: visible3,
  loading: loading3,
  openDialog: openDialog3,
  closeDialog: closeDialog3,
  openLoading: openLoading3,
  closeLoading: closeLoading3,
} = useDialog();

const showTimes = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let curTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
  alert(`${curTime}`);
};
const handleConfirm = () => {
  ElMessage({
    message: "你点击了确定按钮",
    type: "success",
  });
  closeDialog1();
};
const handleClose = () => {
  ElMessage({
    message: "关闭了窗口",
    type: "info",
  });
  closeDialog1();
};

const formDialogRef = ref<InstanceType<typeof formDialog>>();
const openDialog4 = (mode: MODE) => {
  if (!formDialogRef.value) return;
  formDialogRef.value.openDialog(mode);
};
</script>
<style lang="less" scoped>
.app {
  padding: 20px;
}
</style>
