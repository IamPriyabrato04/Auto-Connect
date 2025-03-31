import { atom } from "recoil";

export const authState = atom<boolean>({
    key: "authState",
    default: !!localStorage.getItem("token"), // Check localStorage on page reload
});
