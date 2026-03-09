// All Issues:
let issueArray = [];
const urlAllIssues = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
fetch(urlAllIssues)
  .then((response) => response.json())
  .then((data) => {
    issueArray = Object.values(data.data);
    displayAllIssues(issueArray);
  });

// Individual Details
const getDetails = (id) => {
  const urlSingleIssue = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(urlSingleIssue)
    .then((response) => response.json())
    .then((details) => getIndividualDetails(details.data));
};

// Main Function

const displayAllIssues = (issues) => {
  const issuesContainer = document.querySelector('.issues-container');

  let issuesCounter = document.querySelector('.issues-counter');
  issuesCounter.innerText = `${issues.length} issues`;

  issuesContainer.innerHTML = '';

  issues.forEach((issue) => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div  onclick="getDetails(${issue.id})" class="issue-card p-5 w-full shadow-2xl rounded-2xl border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-red-600'} h-full">
          <div class="card-header flex justify-between items-center w-full">
            <div class="w-4 h-4 ${issue.status === 'open' ? 'bg-green-600' : 'bg-red-600'} rounded-full"></div>
            <div class="indicator bg-gray-200 rounded-full py-1 px-2.5">
              <p>${issue.priority ? issue.priority : 'Normal'}</p> 
            </div>
          </div> 
          <h2 class="font-semibold text-xl my-3">
            ${issue.title}
          </h2>
          <p class="text-grey-500">${issue.description}</p>
          <div class="labels-area flex items-center gap-2  my-3">
            ${getLabels(issue.labels)}
          </div>
          <h2 class="author font-semibold">${issue.author || 'Unknown'}</h2>
          <h3 class="date mt-1">${issue.updatedAt || 'No Date'}</h3>
        </div>
    `;
    issuesContainer.appendChild(card);
  });
};

// Individual Details Function

const getIndividualDetails = (details) => {
  const modal = document.getElementById('my_modal');
  modal.showModal();

  const container = document.querySelector('.modal-box');
  container.innerHTML = `

        <h1 class="text-3xl font-extrabold">${details.title}</h1>
        <div class="flex justify-between gap-2 my-3">
          <h4 class= "p-1.5 text-white rounded-xl ${details.status === 'open' ? 'bg-green-600' : 'bg-red-600'}">${details.status}</h4>
          <span class="">${details.author}</span>
          <span class="">${details.createdAt}</span>
        </div>
         <div class="labels-area flex items-center gap-2  my-3">
            ${getLabels(details.labels)}
        </div>
        <h2 class="font-bold text-2xl">${details.description}</h2>
        <div class="modal-footer w-full flex  justify-between rounded-2xl bg-gray-100 mt-4 p-2">
          <div>
            <h3 class="font-semibold text-xl">Assignee</h3>
            <p class="font-semibold">${details.assignee ? details.assignee : `Not Found`}</p>
          </div>
          <div class="flex items-center">
            <h3 class="font-semibold text-xl">Priority: </h3>
            <p class="font-semibold rounded p-2 bg-amber-200">${details.priority}</p>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
  `;
};

// Button Functionalities

const allBtn = document.querySelectorAll('.toogle');

allBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    allBtn.forEach((b) => {
      b.classList.remove('btn-neutral');
    });
    btn.classList.add('btn-neutral');

    const fileType = btn.innerText.toLowerCase();
    if (fileType == 'all') {
      displayAllIssues(issueArray);
    } else {
      const filteredArray = issueArray.filter(
        (issue) => issue.status == fileType,
      );
      displayAllIssues(filteredArray);
    }
  });
});

// Get Label Function
let getLabels = [];
getLabels = (arry) => {
  const labels = arry.map(
    (label) =>
      `<span class="bg-amber-200 font-semibold p-1.5 rounded-md">${label}</span>`,
  );
  return labels.join('');
};
