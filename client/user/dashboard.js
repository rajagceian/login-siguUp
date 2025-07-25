const username = localStorage.getItem("username") || "User";
document.getElementById("greeting").textContent = `Hi, ${username} 👋`;

const name = document.querySelector('#username');
const email = document.querySelector('#useremail');

name.textContent = username;
email.textContent = localStorage.getItem("useremail") || "loading...";
const logout = document.getElementById('log-out-btn');
logout.addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:8000/api/auth/signup', {
            method: 'GET',
            credentials: "include"
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.removeItem('username');
            localStorage.removeItem('useremail');

            window.location.href = '../index.html'
        } else {
            alert(data.message || 'log out failed!');
        }
    } catch (err) {
        alert('logging out Error!');
        console.error(err);
    }
});
