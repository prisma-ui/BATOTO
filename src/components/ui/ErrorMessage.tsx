import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "./Button";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "An error occurred while retrieving manga content from proxy services.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[var(--color-surface-1)] border border-[var(--color-border)] rounded-xl max-w-md mx-auto text-center shadow-xl animate-fade-in my-12">
      <div className="text-amber-500 bg-amber-500/10 p-3.5 rounded-full mb-4">
        <FiAlertTriangle size={32} />
      </div>
      <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">
        Connection Interrupted
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} className="min-w-[120px]">
          Retry Request
        </Button>
      )}
    </div>
  );
}
