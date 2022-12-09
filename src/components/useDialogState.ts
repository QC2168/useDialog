import { ref } from "vue";
import { MODE } from "./types";
export default function useDialogState() {
  const mode = ref<MODE>(MODE.ADD);
  const updateMode = (target: MODE) => {
    mode.value = target;
  };
  return { mode, updateMode };
}
