import { appState } from "../../state";
import { storeDataInLocalStorage } from "../../storage";
import type { JobApplication } from "../../types";

export function editJobApplicationForm(
  editApplicationData: JobApplication,
  index: number
): HTMLElement {
  const div = document.createElement("div");
  div.className = "edit-form";
  div.id = "editFormDiv";
  div.innerHTML = `
      <div class="edit-content">
        <h3>Edit Job Application</h3>
        <div class="edit-form-section">
          <form class="application-form" id="editApplicationForm">
            <div>
              <label>Company:</label>
              <input type="text" id="edit_company" />
            </div>
            <div>
              <label>Role:</label>
              <input type="text" id="edit_role" />
            </div>
            <div>
              <label>Type:</label>
              <select id="edit_jobType">
                <option>Onsite</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div id="edit_locationDiv">
              <label>Location:</label>
              <input type="text" id="edit_location" />
            </div>

            <div>
              <label>Date:</label>
              <input type="date" id="edit_date" />
            </div>
            <div>
              <label>Status:</label>
              <select id="edit_status">
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Rejected</option>
                <option>Hired</option>
              </select>
            </div>
            <div>
              <label>Note:</label>
              <textarea
                id="edit_note"
                rows="{3}"
                placeholder="Write your notes..."
              ></textarea>
            </div>
            <div>
              <button type="submit" class='updateBtn'>Update Application</button>
              <button type="button" class='cancelBtn' id='cancelEditForm'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
  `;
  div.style.display = "flex";

  //Create ref for needed elements
  const editForm = div.querySelector("#editApplicationForm") as HTMLFormElement;
  const jobTypeSelect = div.querySelector("#edit_jobType") as HTMLSelectElement;
  const locationDiv = div.querySelector("#edit_locationDiv") as HTMLDivElement;
  const locationField = div.querySelector("#edit_location") as HTMLInputElement;

  const company = div.querySelector("#edit_company") as HTMLInputElement;
  const role = div.querySelector("#edit_role") as HTMLInputElement;
  const date = div.querySelector("#edit_date") as HTMLInputElement;
  const status = div.querySelector("#edit_status") as HTMLSelectElement;
  const note = div.querySelector("#edit_note") as HTMLInputElement;

  // Set prefield application data
  company.value = editApplicationData.company;
  role.value = editApplicationData.role;
  jobTypeSelect.value = editApplicationData.jobType;
  locationField.value = editApplicationData.location;
  date.value = editApplicationData.date;
  status.value = editApplicationData.status;
  note.value = editApplicationData.note;

  // For handle location field
  jobTypeSelect.addEventListener("change", () => {
    const jobTypeSelectedValue = jobTypeSelect.value;
    if (jobTypeSelectedValue === "Onsite") {
      locationDiv.style.display = "flex";
    } else {
      locationDiv.style.display = "none";
    }
  });
  jobTypeSelect.dispatchEvent(new Event("change"));

  //Handle form submit
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Setup error messages
    let errors: string[] = [];

    if (!company.value.trim()) errors.push("Company is required.");
    if (!role.value.trim()) errors.push("Role is required.");
    if (!jobTypeSelect.value) errors.push("Job Type is required.");
    if (!locationField.value.trim() && jobTypeSelect.value === "Onsite")
      errors.push(
        "Location is required if you select your job type as Onsite."
      );
    if (!date.value) errors.push("Date is required.");
    if (!status.value) errors.push("Status is required.");

    if (errors.length > 0) {
      alert("Please check this validation error: \n" + errors.join("\n"));
      return;
    }

    // Proceed to update application data
    const editedApplicationForm: JobApplication = {
      ...editApplicationData,
      company: company.value.trim(),
      role: role.value.trim(),
      jobType: jobTypeSelect.value,
      location:
        jobTypeSelect.value !== "Onsite" ? "" : locationField.value.trim(),
      date: date.value.trim(),
      status: status.value.trim(),
      note: note.value.trim(),
    };

    const updatedList = appState.jobApplications;
    updatedList[index] = editedApplicationForm;
    appState.jobApplications = updatedList;
    storeDataInLocalStorage(appState.jobApplications);

    div.style.display = "none";
  });

  //Handle cancel button
  const cancelBtn = editForm.querySelector(
    "#cancelEditForm"
  ) as HTMLButtonElement;
  cancelBtn.addEventListener("click", () => {
    div.style.display = "none";
  });

  return div;
}
