import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

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
            const errorMessage = err instanceof Error 
                ? err.message
                : (err as {response?: {data?: {message?: string}}})?.response?.data?.message || "Something went wrong";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};
