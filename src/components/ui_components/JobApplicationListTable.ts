import { appState, subscribe } from "../../state";
import { storeDataInLocalStorage } from "../../storage";
import type { JobApplication } from "../../types";
import { editJobApplicationForm } from "./JobApplicationEdit";

export function jobApplicationListTable(): HTMLElement {
  const div = document.createElement("div");

  //Content for table header   
  div.innerHTML = `
        <h3>Job Application Table</h3>
        <div>
          <table class="application-list-table" id="applicationListTable">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Dynamic row -->
              
            </tbody>
          </table>
        </div>
    `;

  const tbody = div.querySelector("tbody")!;
  //Handle dynamic data based on state object changes by subscribe method
  subscribe((applicationsDataArr: JobApplication[]) => {
    tbody.innerHTML = applicationsDataArr
      .map((data, index) => {
        return `
                <tr data-id="${data.id}">
                  <td>${data.company}</td>
                  <td>${data.role}</td>
                  <td>${data.jobType}</td>
                  <td>${data.status}</td>
                  <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                  </td>
                </tr>`;
      })
      .join("");
  });

  //Handle button clicked for delete and edit button
  div.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);

    // For Delete button
    if (target.classList.contains("deleteBtn")) {
      if (
        confirm(
          `Delete application for ${appState.jobApplications[index].company}?`
        )
      ) {
        const updatedList = [...appState.jobApplications];
        updatedList.splice(index, 1);
        appState.jobApplications = updatedList;
        storeDataInLocalStorage(updatedList);
      }
    }

    // For Edit button
    if (target.classList.contains("editBtn")) {
      //Check if any existing form in Dome then remove
      const existingEditForm = document.querySelector("#editFormDiv");
      if (existingEditForm) {
        existingEditForm.remove();
      }

      //Push EditJobApplicationForm on main app's div
      const editForm = editJobApplicationForm(
        appState.jobApplications[index],
        index
      );

      const container = document.querySelector("#app") || document.body;

      container.appendChild(editForm);
    }
  });
  return div;
}
