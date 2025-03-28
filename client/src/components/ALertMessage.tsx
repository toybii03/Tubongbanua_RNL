import { useEffect } from "react";

interface ALertMessageProps {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
  onClose: () => void;
}

const ALertMessage = ({
  message,
  isSuccess,
  isVisible,
  onClose,
}: ALertMessageProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  return (
    <>
      <div
        className={`alert ${isSuccess ? "alert-success" : "alert-danger"} ${
          isVisible ? "show" : "d-none"
        }`}
        role="alert"
      >
        {message}
      </div>
    </>
  );
};

export default ALertMessage;
