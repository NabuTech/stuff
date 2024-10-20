document.addEventListener("DOMContentLoaded", function () {
    // Attach saveNextDayPlan function to the "Commit and Save" button
    const commitButton = document.getElementById("commitBtn");
    if (commitButton) {
      commitButton.addEventListener("click", commitAndSave);
    }
  
    // Load saved checklist and input data from local storage
    loadChecklistAndInputs();
  
    // Function to save checklist and input data to local storage
    function saveChecklistAndInputs() {
      // Save checkboxes
      document.querySelectorAll(".list-group-item input[type='checkbox']").forEach((checkbox, index) => {
        localStorage.setItem(`checkbox-${index}`, checkbox.checked);
      });
  
      // Save daily review and plan inputs only if filled by user
      const inputs = ["accomplishments", "challenges", "improvements", "personalNotes", "learningTopic", "courseTutorial", "jobApply", "linkedinPost", "skillsFocus", "morningTwitter", "freelanceProject", "brandProject", "midDayTwitter", "blogPost", "eveningTwitter", "otherGoals"];
  
      inputs.forEach(inputId => {
        const inputElement = document.getElementById(inputId);
        if (inputElement && inputElement.value !== "") {
          localStorage.setItem(inputId, inputElement.value);
        }
      });
  
      // Update Today's Plan section after saving
      updateTodaysPlan();
    }
  
    // Function to load checklist and input data from local storage
    function loadChecklistAndInputs() {
      // Load checkboxes
      document.querySelectorAll(".list-group-item input[type='checkbox']").forEach((checkbox, index) => {
        const savedValue = localStorage.getItem(`checkbox-${index}`);
        checkbox.checked = savedValue === "true"; // Load if saved, otherwise leave unchecked
      });
  
      // Load daily review and plan inputs only if they exist in local storage
      const inputs = ["accomplishments", "challenges", "improvements", "personalNotes", "learningTopic", "courseTutorial", "jobApply", "linkedinPost", "skillsFocus", "morningTwitter", "freelanceProject", "brandProject", "midDayTwitter", "blogPost", "eveningTwitter", "otherGoals"];
  
      inputs.forEach(inputId => {
        const savedValue = localStorage.getItem(inputId);
        if (savedValue) {
          document.getElementById(inputId).value = savedValue;
        }
      });
  
      // Populate Today's Plan section
      updateTodaysPlan();
    }
  
    // Function to update Today's Plan section with saved values
    function updateTodaysPlan() {
      document.getElementById("todaysLearningTopic").textContent = localStorage.getItem('learningTopic') || "Not set";
      document.getElementById("todaysCourseTutorial").textContent = localStorage.getItem('courseTutorial') || "Not set";
      document.getElementById("todaysJobApply").textContent = localStorage.getItem('jobApply') || "Not set";
      document.getElementById("todaysLinkedinPost").textContent = localStorage.getItem('linkedinPost') || "Not set";
      document.getElementById("todaysSkills").textContent = localStorage.getItem('skillsFocus') || "Not set";
      document.getElementById("todaysMorningTwitter").textContent = localStorage.getItem('morningTwitter') || "Not set";
      document.getElementById("todaysFreelanceProject").textContent = localStorage.getItem('freelanceProject') || "Not set";
      document.getElementById("todaysBrandProject").textContent = localStorage.getItem('brandProject') || "Not set";
      document.getElementById("todaysMidDayTwitter").textContent = localStorage.getItem('midDayTwitter') || "Not set";
      document.getElementById("todaysBlogPost").textContent = localStorage.getItem('blogPost') || "Not set";
      document.getElementById("todaysEveningTwitter").textContent = localStorage.getItem('eveningTwitter') || "Not set";
      document.getElementById("todaysOtherGoals").textContent = localStorage.getItem('otherGoals') || "Not set";
    }
  
    // Function to clear local storage and commit new data when "Commit and Save" is clicked
    function commitAndSave() {
      // Clear local storage only for temporary values (not dailyRecords)
      const keysToKeep = ['dailyRecords'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
  
      // Save current checklist and inputs after clearing irrelevant keys
      saveChecklistAndInputs();
      
      // Save the new daily record
      saveDailyRecord();
  
      // Refresh the record view after saving
      displayRecords();
    }
  
    // Save daily record data into local storage
    function saveDailyRecord() {
      // Prepare task completion data
      const taskCompletionData = {
        learning: [],
        jobSearch: [],
        brandBuilding: [],
        projects: []
      };
  
      // Collect checkboxes by section
      document.querySelectorAll("#collapseLearning input[type='checkbox']").forEach((checkbox, index) => {
        taskCompletionData.learning.push({
          task: `Learning Task ${index + 1}`,
          completed: checkbox.checked
        });
      });
  
      document.querySelectorAll("#collapseJobSearch input[type='checkbox']").forEach((checkbox, index) => {
        taskCompletionData.jobSearch.push({
          task: `Job Task ${index + 1}`,
          completed: checkbox.checked
        });
      });
  
      document.querySelectorAll("#collapseBrand input[type='checkbox']").forEach((checkbox, index) => {
        taskCompletionData.brandBuilding.push({
          task: `Brand Task ${index + 1}`,
          completed: checkbox.checked
        });
      });
  
      document.querySelectorAll("#collapseProjects input[type='checkbox']").forEach((checkbox, index) => {
        taskCompletionData.projects.push({
          task: `Project Task ${index + 1}`,
          completed: checkbox.checked
        });
      });
  
      // Prepare daily review data
      const dailyReview = {
        accomplishments: document.getElementById("accomplishments").value,
        challenges: document.getElementById("challenges").value,
        improvements: document.getElementById("improvements").value,
        personalNotes: document.getElementById("personalNotes").value
      };
  
      // Generate today's date as record identifier
      const currentDate = new Date().toISOString().split('T')[0];
  
      // Save the new record
      const dailyRecord = {
        date: currentDate,
        taskCompletion: taskCompletionData,
        dailyReview: dailyReview
      };
  
      // Retrieve existing records or initialize an empty array
      let savedRecords = JSON.parse(localStorage.getItem('dailyRecords')) || [];
      savedRecords.push(dailyRecord); // Add the new record
      localStorage.setItem('dailyRecords', JSON.stringify(savedRecords)); // Save back to localStorage
  
      // Clear inputs after saving
      clearInputs();
    }
  
    // Function to clear inputs after committing data
    function clearInputs() {
      // Clear checkboxes
      document.querySelectorAll(".list-group-item input[type='checkbox']").forEach(checkbox => {
        checkbox.checked = false;
      });
  
      // Clear daily review inputs
      const inputs = ["accomplishments", "challenges", "improvements", "personalNotes"];
      inputs.forEach(inputId => {
        document.getElementById(inputId).value = '';
      });
    }
  
    // Function to display saved records in a table
    function displayRecords() {
      const savedRecords = JSON.parse(localStorage.getItem('dailyRecords')) || [];
      const recordsTableBody = document.querySelector("#recordsTable tbody");
      recordsTableBody.innerHTML = ''; // Clear any existing rows
  
      savedRecords.forEach((record, index) => {
        const completionPercentage = calculateCompletionPercentage(record.taskCompletion);
        recordsTableBody.innerHTML += `
          <tr>
            <td>${record.date}</td>
            <td>${completionPercentage}%</td>
            <td>
              <button class="btn btn-primary" onclick="viewRecordDetails(${index})" data-bs-toggle="modal" data-bs-target="#recordDetailsModal">View Details</button>
            </td>
          </tr>
        `;
      });
    }
  
    // Function to calculate task completion percentage
    function calculateCompletionPercentage(taskCompletion) {
      let totalTasks = 0;
      let completedTasks = 0;
  
      for (const section in taskCompletion) {
        taskCompletion[section].forEach(task => {
          totalTasks += 1;
          if (task.completed) {
            completedTasks += 1;
          }
        });
      }
  
      return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    }
  
    // Function to view record details in the modal
    window.viewRecordDetails = function (index) {
      const savedRecords = JSON.parse(localStorage.getItem('dailyRecords')) || [];
      const record = savedRecords[index];
  
      // Populate the modal with the record details
      document.getElementById("modalDate").textContent = record.date;
      const taskCompletionList = document.getElementById("modalTaskCompletion");
      taskCompletionList.innerHTML = ''; // Clear existing content
  
      // Display task completion details
      for (const section in record.taskCompletion) {
        taskCompletionList.innerHTML += `<li><strong>${section}:</strong></li>`;
        record.taskCompletion[section].forEach(task => {
          taskCompletionList.innerHTML += `<li>${task.task}: ${task.completed ? 'Completed' : 'Not Completed'}</li>`;
        });
      }
  
      // Display daily review
      const dailyReviewList = document.getElementById("modalDailyReview");
      dailyReviewList.innerHTML = `
        <li><strong>Accomplishments:</strong> ${record.dailyReview.accomplishments}</li>
        <li><strong>Challenges:</strong> ${record.dailyReview.challenges}</li>
        <li><strong>Improvements:</strong> ${record.dailyReview.improvements}</li>
        <li><strong>Personal Notes:</strong> ${record.dailyReview.personalNotes}</li>
      `;
    }
  
    // Initially display records
    displayRecords();
  });
  