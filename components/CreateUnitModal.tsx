import { unitService } from "@/service/unitService";
import { CreateUnitPayload } from "@/types/unit";
import { X } from "lucide-react";
import React, { useState } from "react";

type CreateUnitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CreateUnitModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateUnitModalProps) => {
  const [formData, setFormData] = useState<CreateUnitPayload>({
    name: "",
    type: "",
    status: "available",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type) {
      setError("Please select a unit type");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await unitService.createUnit(formData);

      setFormData({
        name: "",
        type: "",
        status: "available",
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save unit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-8 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Unit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase text-gray-400">
              Unit Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
              placeholder="e.g. Capsule-B03"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-gray-400">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={`w-full border-b border-gray-200 py-2 focus:border-black outline-none bg-transparent cursor-pointer transition-colors ${
                formData.type === "" ? "text-gray-400" : "text-black"
              }`}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="capsule" className="text-black">
                Capsule
              </option>
              <option value="cabin" className="text-black">
                Cabin
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-xl font-medium mt-6 transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {isLoading ? "Saving..." : "Save Unit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUnitModal;
