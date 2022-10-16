import { ref, type Ref } from "vue";
interface DialogMethodsType {
  openDialog: () => void;
  closeDialog: () => void;
  openLoading: () => void;
  closeLoading: () => void;
}
type UseDialogReturnType = [
  Ref<boolean>,
  Ref<boolean>,
  DialogMethodsType
];
export default function useDialog(): UseDialogReturnType {
  const visible = ref(false);
  const loading = ref(false);
  const openDialog = () => (visible.value = true);
  const closeDialog = () => (visible.value = false);
  const openLoading = () => (loading.value = true);
  const closeLoading = () => (loading.value = false);
  return [
    visible,
    loading,
    { openDialog, closeDialog, openLoading, closeLoading },
  ];
}
