// All Issues:
let issueArray = [];
const urlAllIssues = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
fetch(urlAllIssues)
  .then((response) => response.json())
  .then((data) => {
    issueArray = Object.values(data.data);
    displayAllIssues(issueArray);
  });

const displayAllIssues = (issues) => {
  const issuesContainer = document.querySelector('.issues-container');
  issuesContainer.innerHTML = '';

  issues.forEach((issue) => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="issue-card p-5 w-full shadow-2xl rounded-2xl border-t-4 ${issue.status === 'open' ? 'border-t-green-600' : 'border-t-red-600'} h-full">
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
          <div class="bugs-area flex items-center justify-between my-3">
            <div class=" bg-red-200 rounded-full py-1 px-2.5 flex gap-1 items-center p-1">
              <i class="fas fa-bug"></i><p>BUGS</p>
            </div>
            <div class=" bg-amber-200 rounded-full py-1 px-2.5 flex gap-1 items-center p-1">
              <i class="fas fa-question-circle"></i><p>HELP</p>
            </div>
          </div>
          <h2 class="author font-semibold">${issue.author || 'Unknown'}</h2>
          <h3 class="date mt-1">${issue.updatedAt || 'No Date'}</h3>
        </div>
    `;
    issuesContainer.appendChild(card);
  });
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
    if (fileType == 'all' ) {
      displayAllIssues(issueArray)
    }
    else {
      const filteredArray = issueArray.filter((issue) => issue.status == fileType)
      displayAllIssues(filteredArray)
    }
  });
});
