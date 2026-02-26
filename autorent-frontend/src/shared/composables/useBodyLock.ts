import { watch, onUnmounted } from "vue";
import type { Ref } from "vue";

export const useBodyLock = (isOpen: Ref<boolean>) => {
  const originalOverflow = document.body.style.overflow;

  const stop = watch(isOpen, (val) => {
    document.body.style.overflow = val ? "hidden" : originalOverflow;
  }, { immediate: true });

  onUnmounted(() => {
    document.body.style.overflow = originalOverflow;
    stop();
  });
};