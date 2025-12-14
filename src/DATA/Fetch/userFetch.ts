import { handleResponse } from "./wrapper/handleResponse";
import { apiFetch } from "./wrapper/apiFetch";
import { FetchTypes } from "@src/DATA/Type/FetchTypes";
export const getUser = async () => {
  const res = await apiFetch("/user", {
    method: "GET",
  });
  return handleResponse(res);
};
export const updateUser = async (userId, updatedUser) => {
  const res = await apiFetch(`/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return handleResponse(res);
};
export const deleteUser = async (userId) => {
  const res = await apiFetch(`/user/${userId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};
export const getPdfReport = async (options?: FetchTypes) => {
  const res = await apiFetch("/user/generate/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options || { download: false }),
  });

  return handleResponse(res, options);
};
