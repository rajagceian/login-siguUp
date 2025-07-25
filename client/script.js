const loginBtn = document.getElementById("show-login");
const signupBtn = document.getElementById("show-signup");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formBody = document.querySelector('.form-container');
const loader = document.querySelector('.loader');
loginBtn.addEventListener("click", () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
  loginBtn.classList.add("active");
  signupBtn.classList.remove("active");
});

signupBtn.addEventListener("click", () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
  signupBtn.classList.add("active");
  loginBtn.classList.remove("active");
});
// Toggle password visibility
document.querySelectorAll(".eye-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling;
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);

    // Toggle icon emoji
    icon.textContent = type === "password" ? "👁️" : "🙈";
  });
});

// login -> haddle 
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  // add loader
  formBody.classList.add('loader-comes');
  loader.style.display = 'block';
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('http://localhost:8000/api/auth/signin', {
      method: 'POST',
      credentials: 'include', // <-- required for cookies!
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const info = await res.json();

    // alert(info.message || 'Login successful!');
    // console.log(info.data.name);
    if (res.ok) {
        // remove loader
    formBody.classList.remove('loader-comes');
    loader.style.display = 'none';

    localStorage.setItem("username", info.data.name); // Save username
    localStorage.setItem("useremail",info.data.email);
    window.location.href = "./user/dashboard.html";   // Redirect to user interface
    }

  } catch (err) {
    // remove loader
    console.error(err);
    alert('Login failed');
  }
});

//**********************  signUp -> haddle ***************/
const signup = document.getElementById('signup-form');
signup.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm').value;
  // add loader
  formBody.classList.add('loader-comes');
  loader.style.display = 'block';
  try {
    const res = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    const data = await res.json();
    if(res.ok){
        // remove loader
    formBody.classList.remove('loader-comes');
    loader.style.display = 'none';
    let newHtml = `
                  <div class="signup-ok">
                  <p>Your are Registered <strong style="color:green">successfully!!</strong></p>
                  <p><a href="./index.html" style="color:red">click here</a> to log in</p>
                  </div>
                  `
          signup.innerHTML = newHtml;
    }
  } catch (err) {
    console.error(err);
    alert('Signup failed');
  }
});
