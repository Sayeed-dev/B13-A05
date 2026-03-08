// LogIn Functionalities
const submitButton = document.querySelector('.submitBtn');
submitButton.addEventListener('click', () => {
  const userId = document.querySelector('.userid').value;
  const password = document.querySelector('.password').value;

  if (userId === 'admin' && password === 'admin123') {
    window.location.href = 'home.html';
  } else {
    alert('Sorry, wrong User ID or Password');
  }
});

