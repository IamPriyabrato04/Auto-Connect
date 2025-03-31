import { useState } from "react";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Update with your backend URL

export const useFetch = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: unknown) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data: body,
        headers: { "Content-Type": "application/json" },
      });

      setData(response.data);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};
