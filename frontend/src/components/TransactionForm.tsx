import { useState } from "react";
import { TransactionCategory, TransactionType } from "../types";

interface Props {
  onClose: () => void;
  onAdd: (data: {
    description: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
  }) => void;
}

const TransactionForm = ({ onClose, onAdd }: Props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<TransactionCategory>("food");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!description || !amount || !type || !category) return;

    onAdd({ description, amount: parseFloat(amount), type, category });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-5">
      <h3 className="mb-3 font-semibold text-gray-800 text-sm">
        Add transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="salary">Salary</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg
                       text-sm font-medium hover:bg-indigo-700 transition"
          >
            Save
          </button>
          <button
            className="text-sm font-medium text-gray-400 px-4 py-1.5 hover:bg-gray-100 border border-gray-200 rounded-lg transition"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
