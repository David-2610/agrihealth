
import { ToastActionElement } from "@/components/ui/toast";

export interface ToastAPI {
  (props: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
    variant?: "default" | "destructive";
  }): void;
}
