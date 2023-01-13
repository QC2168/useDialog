import { FormInstance } from "element-plus";
import { computed, Ref, ref } from "vue";
import useDialogState from "./useDialogState";

export enum MODE {
  ADD='add',
  EDIT='edit',
  READONLY='readonly',
}

export default function useDialogFn(
  formInstance: Ref<FormInstance|undefined>
) {
  const { visible, mode, updateMode } = useDialogState();

  const closeDialog = () => {
    formInstance.value?.resetFields();
    visible.value = false;
  };
  const openDialog = (target: MODE|'add'|'edit'|'readonly') => {
    updateMode(target);
    visible.value = true;
    formInstance.value?.resetFields();
  };

  const modeText = computed(() => {
    if (mode.value === 'add') return '添加';
    if (mode.value === 'edit') return '编辑';
    if (mode.value === 'readonly') return '详情';
  });

  return { visible, mode, openDialog, closeDialog, modeText };
}
