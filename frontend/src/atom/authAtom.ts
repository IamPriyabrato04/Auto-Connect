import { atom } from "recoil";

export const authState = atom({
    key: "authState",
    default: {
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!localStorage.getItem("token"),
    },
});

export const themeState = atom<"light" | "dark">({
    key: "themeState",
    default: "dark", // Default mode is dark
});
