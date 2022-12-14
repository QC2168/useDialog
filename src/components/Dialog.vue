<template>
  <div class="">
    <el-dialog
      v-bind="attrs"
      :model-value="props.modelValue"
      :show-close="false"
      :fullscreen="attrs?.fullscreen ?? isFullscreen"
      :before-close="handleClose"
    >
      <template #header>
        <div>
          <span class="dialog-title">{{ props.title }}</span>
        </div>
        <div class="btns">
          <el-icon v-if="isFullScreenBtn" @click="handleFullscreen"
            ><FullScreen
          /></el-icon>
          <el-icon @click="handleClose"><Close /></el-icon>
        </div>
      </template>
      <div class="content" v-loading="props.loading">
        <slot></slot>
      </div>

      <template #footer>
        <span v-if="!slots.footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">{{
            props.confirmText
          }}</el-button>
          <el-button @click="handleClose">{{ props.cancelText }}</el-button>
        </span>
        <slot v-else name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useSlots } from "vue";
import { FullScreen, Close } from "@element-plus/icons-vue";
const attrs = useAttrs();
const slots = useSlots();
const isFullscreen = ref(false);
const isFullScreenBtn = computed(() => {
  if (props.hiddenFullBtn) return false;
  if (attrs?.fullscreen) return false;
  return true;
});

interface PropsType {
  title?: string;
  isDraggable?: boolean;
  modelValue?: boolean;
  hiddenFullBtn?: boolean;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  title: "",
  isDraggable: false,
  modelValue: false,
  hiddenFullBtn: false,
  loading: false,
  confirmText: "确认",
  cancelText: "关闭",
});

const emits = defineEmits<{
  (e: "update:modelValue"): void;
  (e: "confirm"): void;
  (e: "close"): void;
}>();

const handleFullscreen = () => {
  if (attrs?.fullscreen) return;
  isFullscreen.value = !isFullscreen.value;
};
const handleClose = () => {
  if (
    Reflect.has(attrs, "before-close") &&
    typeof attrs["before-close"] === "function"
  ) {
    attrs["before-close"]();
  }
  emits("close");
};
const handleConfirm = () => {
  emits("confirm");
};
defineExpose({
  isVisible: props.modelValue,
});
</script>

<style lang="less" scoped>
:deep(.el-dialog__header) {
  border-bottom: 1px solid #eee;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}
.dialog-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
}
.btns {
  display: flex;
  align-items: center;
  i {
    margin-right: 8px;

    font-size: 16px;
    cursor: pointer;
  }
  i:last-child {
    margin-right: 0;
  }
}
</style>
