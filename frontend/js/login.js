const apiUrl = "https://desired-monthly-griffon.ngrok-free.app/api/users";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputUsername = document.getElementById("username").value;
  const inputPassword = document.getElementById("password").value;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const users = response.data;

    const foundUser = users.find(
        //เช็ค email แทน username <--
      user => user.email === inputUsername && user.password === inputPassword
    );

    if (foundUser) {
      Swal.fire("Login Success!", `Welcome, ${foundUser.name}`, "success");
      window.location.href = "showdata.html"
      // เปลี่ยนหน้าหลัง login ได้ เช่น:
      // window.location.href = "dashboard.html";
    } else {
      Swal.fire("Login Failed", "Invalid username or password", "error");
    }

  } catch (error) {
    console.error("Login error:", error);
    Swal.fire("Error", "Something went wrong", "error");
  }
});
