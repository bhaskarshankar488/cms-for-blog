interface ConfirmModalProps {
  open: boolean;

  title: string;

  message: string;

  onConfirm: () => void;

  onClose: () => void;

  loading?: boolean;
}

const ConfirmModal = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  loading = false,
}: ConfirmModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;