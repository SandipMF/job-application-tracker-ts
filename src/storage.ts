import type { JobApplication } from "./types";

// set all the Local Storage key
const LOCAL_STORAGE_KEY = "job_applications";

//method for store in local storage
export function storeDataInLocalStorage(data: JobApplication[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

//method for fetch from local storage
export function fetchDataFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
