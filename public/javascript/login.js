async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
    console.log("=============SIGNUP=================")
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }

  function showSignUp(event){
   event.preventDefault();
      document.getElementById("sign-up").style.display = "block";
      document.getElementById("login").style.display = "none";
  }

  function showLogin(event){
     event.preventDefault();
        document.getElementById("login").style.display = "block";
        document.getElementById("sign-up").style.display = "none";
    }
  
  document.getElementById('signUpBtn').addEventListener('click', showSignUp);
  document.getElementById('loginBtn').addEventListener('click', showLogin);

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);