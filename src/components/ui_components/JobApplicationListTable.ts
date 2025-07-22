import { appState, subscribe } from "../../state";
import { storeDataInLocalStorage } from "../../storage";
import type { JobApplication } from "../../types";
import { editJobApplicationForm } from "./JobApplicationEdit";

export function jobApplicationListTable(): HTMLElement {
  const div = document.createElement("div");

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

  div.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const index = Number(target.dataset.index);

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

    if (target.classList.contains("editBtn")) {
      //Check if any existing form in Dome then remove
      const existingEditForm = document.querySelector("#editFormDiv");
      if (existingEditForm) {
        existingEditForm.remove();
      }

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
