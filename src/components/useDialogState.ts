import { ref } from "vue";
import { MODE } from "./types";
export default function useDialogState() {
  const mode = ref<MODE>(MODE.ADD);
  const visible = ref(false);
  const updateMode = (target: MODE) => {
    mode.value = target;
  };
  return { mode, visible, updateMode };
}
