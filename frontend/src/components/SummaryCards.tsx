import { ISummary } from "../types";

interface Props {
  summary: ISummary;
}

// helper function to convert number to ph currency
const fmt = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 2 });

const SummaryCard = ({ summary }: Props) => {
  const { income, expense, balance } = summary;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <p className="text-xs text-gray-400 mb-1">Balance</p>
        <p
          className={`text-xl font-bold ${summary.balance >= 0 ? "text-gray-900" : "text-red-500"}`}
        >
          {fmt(balance)}
        </p>
      </div>
      <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
        <p className="text-xs text-emerald-600 mb-1">Income</p>
        <p className="text-xl font-bold text-emerald-700">{fmt(income)}</p>
      </div>
      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <p className="text-xs text-red-500 mb-1">Expense</p>
        <p className="text-xl font-bold text-red-600">{fmt(expense)}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
