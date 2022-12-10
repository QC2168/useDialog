import { FormInstance } from "element-plus";
import { Ref, ref } from "vue";
import { MODE } from "./types";
import useDialogState from "./useDialogState";
interface OptionType {
  preOpenDialog?: () => void;
}

export default function useDialogFn(
  formInstance: Ref<FormInstance>
) {
  const { visible, mode, updateMode } = useDialogState();

  const closeDialog = () => {
    formInstance.value.resetFields();
    visible.value = false;
  };
  const openDialog = (target: MODE) => {
    updateMode(target);
    visible.value = true;
  };
  return { visible, mode, openDialog, closeDialog };
}
