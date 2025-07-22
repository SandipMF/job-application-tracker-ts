import { subscribe } from "../../state";
import type { JobApplication } from "../../types";

export function jobApplicationSummary(): HTMLElement {
  const summary = document.createElement("div");
  summary.className = "summary-row";
  summary.id = "jobSummary";

  //set the inner content of summary with dynamic value
  function updateSummary(applications: JobApplication[]) {
    // calculate the count of individual status with total
    const totalCount = applications.length;
    const appliedCount = applications.filter(
      (data) => data.status === "Applied"
    ).length;
    const interviewingCount = applications.filter(
      (data) => data.status === "Interviewing"
    ).length;
    const hiredCount = applications.filter(
      (data) => data.status === "Hired"
    ).length;
    const rejectedCount = applications.filter(
      (data) => data.status === "Rejected"
    ).length;

    summary.innerHTML = `
      <div class="indevidual-status">Job Application: ${totalCount}</div>
      <div class="indevidual-status">Applied: ${appliedCount}</div>
      <div class="indevidual-status">Interviewing: ${interviewingCount}</div>
      <div class="indevidual-status hired">Hired: ${hiredCount}</div>
      <div class="rejected">Rejected: ${rejectedCount}</div>
    `;
  }

  //This will update the count in real time based on state object changed
  subscribe(updateSummary);

  return summary;
}
