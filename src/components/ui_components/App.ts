import { appState } from "../../state";
import { fetchDataFromLocalStorage } from "../../storage";
import { jobApplicationCreateForm } from "./JobApplicationCreate";
import { jobApplicationListTable } from "./JobApplicationListTable";
import { jobApplicationSummary } from "./JobApplicationSummary";

export function AppInit() {
  const appDiv = document.getElementById("app");

  //   For NAV
  const nav = document.createElement("nav");
  nav.innerHTML = `
    <div>
        <h1>Job Application Tracker System</h1>
    </div>
  `;

  appDiv?.appendChild(nav);

  //Summary
  appDiv?.appendChild(jobApplicationSummary());

  // From with Table
  const formWithTable = document.createElement("div");
  formWithTable.className = "form-with-table";

  //Create new job application
  formWithTable.appendChild(jobApplicationCreateForm());

  //Job Application List Table
  const tableWrapper = document.createElement("div");
  tableWrapper.className = "application-list-section";
  tableWrapper.appendChild(jobApplicationListTable());
  formWithTable.appendChild(tableWrapper);

  appDiv?.appendChild(formWithTable);

  appState.jobApplications = fetchDataFromLocalStorage();
}
