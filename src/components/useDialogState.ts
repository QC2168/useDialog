import { ref } from "vue";
import { MODE } from "./types";

export default function useDialogState() {
  const mode = ref<MODE|'add'|'edit'|'readonly'>(MODE.ADD);
  const visible = ref(false);
  const updateMode = (target: MODE|'add'|'edit'|'readonly') => {
    mode.value = target;
  };
  return { mode, visible, updateMode };
}
