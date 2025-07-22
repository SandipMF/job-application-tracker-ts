import type { JobApplication } from "./types";

const LOCAL_STORAGE_KEY = "job_applications";

export function storeDataInLocalStorage(data: JobApplication[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function fetchDataFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
