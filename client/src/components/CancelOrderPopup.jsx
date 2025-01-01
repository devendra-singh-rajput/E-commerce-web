import React, { useState } from "react";
import PropTypes from "prop-types";

const CancelOrderPopup = ({ isOpen, onClose, onSubmit,parentOrder, orderId }) => {
  const [reason, setReason] = useState("");

  const handleInputChange = (e) => {
    if (e.target.value.length <= 50) {
      setReason(e.target.value);
    }
  };

  const handleCancelOrder = () => {
    if (!reason.trim()) {
      alert("Please provide a reason for canceling the order.");
      return;
    }
    onSubmit(parentOrder,orderId, reason); // Pass order ID and reason back to the parent
    setReason(""); // Reset the input field
    onClose(); // Close the popup
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-700 bg-opacity-5">
      <div className="relative bg-slate-100 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Cancel Order</h2>
        <p className="text-gray-700 mb-4">
          Please provide a reason for canceling this order (max 50 characters):
        </p>

        {/* Input Field */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter reason..."
          value={reason}
          onChange={handleInputChange}
          rows="3"
        />
        <div className="text-sm text-gray-500 mt-2">
          {reason.length}/50 characters
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

CancelOrderPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default CancelOrderPopup;
