import { defineStore } from "pinia";

interface IToast {
  text: string;
  id: number;
}

type ToastPayload = { timeout?: number; text: string };

const defaultTimeout = 3000;

const createToast = (text: string): IToast => ({
  text,
  id: Math.random() * 1000,
});

export default defineStore("toastStore", {
    state: (): { toasts: IToast[] } => ({
        toasts: [],
    }),
    actions: {
    updateState(payload: ToastPayload) {
      const { text, timeout } = payload;

      const toast = createToast(text);

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id);
      }, timeout ?? defaultTimeout);
    },
    success(payload: ToastPayload) {
      this.updateState(payload);
    },
  },
});