import axios from "axios";
import { ITranscation, ISummary, ICategoryData } from "../types";

const BASE = "http://localhost:4000/api/transactions";

const cfg = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getTransactions = (token: string) =>
  axios.get<ITranscation[]>(BASE, cfg(token));

export const createTransaction = (
  payload: Omit<ITranscation, "_id" | "createdAt" | "date">,
  token: string,
) => axios.post<ITranscation>(BASE, payload, cfg(token));

export const deleteTransaction = (id: string, token: string) =>
  axios.delete(`${BASE}/${id}`, cfg(token));

export const getSumary = (token: string) =>
  axios.get<ISummary>(`${BASE}/summary`, cfg(token));

export const getByCategory = (token: string) =>
  axios.get<ICategoryData[]>(`${BASE}/category`, cfg(token));
