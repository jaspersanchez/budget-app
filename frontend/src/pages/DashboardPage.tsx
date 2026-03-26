import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import {
  ICategoryData,
  ISummary,
  ITranscation,
  TransactionCategory,
  TransactionType,
} from "../types";
import * as api from "../api/transactions.api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SummaryCard from "../components/SummaryCards";
import SpendingChart from "../components/SpendingChart";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<ITranscation[]>([]);
  const [summary, setSummary] = useState<ISummary>({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [chartData, setChartData] = useState<ICategoryData[]>([]);

  const loadAll = async () => {
    if (!user) return;
    const [t, s, c] = await Promise.all([
      api.getTransactions(user.token),
      api.getSumary(user.token),
      api.getByCategory(user.token),
    ]);

    setTransactions(t.data);
    setSummary(s.data);
    setChartData(c.data);
  };

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!user) return;

      const [t, s, c] = await Promise.all([
        api.getTransactions(user.token),
        api.getSumary(user.token),
        api.getByCategory(user.token),
      ]);

      if (!isMounted) return;

      setTransactions(t.data);
      setSummary(s.data);
      setChartData(c.data);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    await api.deleteTransaction(id, user?.token);
    loadAll();
  };

  const handleAdd = async (data: {
    description: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
  }) => {
    if (!user) return;

    await api.createTransaction(data, user.token);
    setShowForm(false);
    loadAll();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3 ">
          <h1 className="font-semibold text-gray-900 text-sm">
            Budget Tracker
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400">Hi, {user?.name}</p>
            {!showForm && (
              <button
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 transition"
                onClick={() => setShowForm(true)}
              >
                + Add
              </button>
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="border border-gray-200 text-gray-500 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <SummaryCard summary={summary} />
        <SpendingChart data={chartData} />
        {showForm && (
          <TransactionForm
            onAdd={handleAdd}
            onClose={() => setShowForm(false)}
          />
        )}
        <p>Transactions</p>
        <TransactionList onDelete={handleDelete} transactions={transactions} />
      </main>
    </div>
  );
};

export default DashboardPage;
