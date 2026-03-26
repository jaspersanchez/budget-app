import { ITranscation } from "../types";

interface Props {
  transactions: ITranscation[];
  onDelete: (id: string) => void;
}

const TransactionList = ({ transactions, onDelete }: Props) => {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition group"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${t.type === "income" ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {t.description}
              </p>
              <p className="text-xs text-gray-400 capitalize">{t.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p
              className={`text-sm font-semibold ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}
            >
              {t.type === "income" ? "+" : "-"}₱{t.amount.toLocaleString()}
            </p>
            <button
              onClick={() => onDelete(t._id)}
              className="text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
