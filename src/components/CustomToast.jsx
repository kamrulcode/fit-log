import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle,
    iconColor: "text-lime-400",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-400",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-400",
  },
};

export default function CustomToast({ message, type = "success", closeToast }) {
  const { icon: Icon, iconColor } = toastStyles[type];

  return (
    <div className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-[#15181d] px-4 py-3 text-sm text-white shadow-xl">
      <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />

      <span className="flex-1">{message}</span>

      <button
        type="button"
        onClick={closeToast}
        className="ml-2 text-gray-500 transition-colors hover:text-white"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
