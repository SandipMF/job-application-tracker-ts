import { appState } from "../../state";
import { storeDataInLocalStorage } from "../../storage";
import type { JobApplication } from "../../types";

export function jobApplicationCreateForm(): HTMLElement {
  const div = document.createElement("div");

  div.className = "form-section";

  div.innerHTML = `
        <h3>Application Form</h3>
        <form class="application-form" id="createApplicationForm">
          <div>
            <label>Company:</label>
            <input type="text" id="company" />
          </div>
          <div>
            <label>Role:</label>
            <input type="text" id="role" />
          </div>
          <div>
            <label>Type:</label>
            <select id="jobType">
              <option>Onsite</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div id="locationDiv">
            <label>Location:</label>
            <input type="text" id="location" />
          </div>

          <div>
            <label>Date:</label>
            <input type="date" id="date"/>
          </div>
          <div>
            <label>Status:</label>
            <select id="status" >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>
          <div>
            <label>Note:</label>
            <textarea
              id="note"
              rows="3"
              placeholder="Write your notes..."
            ></textarea>
          </div>
          <div class="div-footer-button-container">
            <button class="submitBtn" type="submit">Submit</button>
          </div>
        </form>
    `;

  // Handle Location Div
  const applicationForm = div.querySelector(
    "#createApplicationForm"
  ) as HTMLFormElement;
  const jobTypeSelect = div.querySelector("#jobType") as HTMLSelectElement;
  const locationDiv = div.querySelector("#locationDiv") as HTMLDivElement;
//   const locationField = div.querySelector("#location") as HTMLInputElement;

  jobTypeSelect.addEventListener("change", () => {
    const jobTypeSelectedValue = jobTypeSelect.value;
    if (jobTypeSelectedValue === "Onsite") {
      locationDiv.style.display = "flex";
    } else {
      locationDiv.style.display = "none";
    }
  });

  // Initial state for location field
  jobTypeSelect.dispatchEvent(new Event("change"));
  
  //Handle form submit
  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    //Create ref of each field
    const company = (
      applicationForm.querySelector("#company") as HTMLInputElement
    ).value.trim();
    const role = (
      applicationForm.querySelector("#role") as HTMLInputElement
    ).value.trim();
    const jobType = (
      applicationForm.querySelector("#jobType") as HTMLSelectElement
    ).value;
    const location = (
      applicationForm.querySelector("#location") as HTMLInputElement
    ).value.trim();
    const date = (applicationForm.querySelector("#date") as HTMLInputElement)
      .value;
    const status = (
      applicationForm.querySelector("#status") as HTMLSelectElement
    ).value;
    const note = (
      applicationForm.querySelector("#note") as HTMLTextAreaElement
    ).value.trim();

    //Setup error messages
    let errors: string[] = [];

    if (!company) errors.push("Company is required.");
    if (!role) errors.push("Role is required.");
    if (!jobType) errors.push("Job Type is required.");
    if (!location && jobType === "Onsite")
      errors.push(
        "Location is required if you select your job type as Onsite."
      );
    if (!date) errors.push("Date is required.");
    if (!status) errors.push("Status is required.");

    if (errors.length > 0) {
      alert("Please check this validation error: \n" + errors.join("\n"));
      return;
    }

    //If all ok proceed to add new job application
    const newApplication: JobApplication = {
      id: crypto.randomUUID(),
      company,
      role,
      jobType,
      location: jobType !== "Onsite" ? "" : location,
      date,
      status,
      note,
    };

    appState.jobApplications = [...appState.jobApplications, newApplication];
    storeDataInLocalStorage(appState.jobApplications);

    applicationForm.reset();
  });

  return div;
}
