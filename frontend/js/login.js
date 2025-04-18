const apiUrl = "https://desired-monthly-griffon.ngrok-free.app/api/users";

// ✅ ตรวจว่ามี loginForm ไหม ก่อนจะผูก event
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputUsername = document.getElementById("username").value.trim();
    const inputPassword = document.getElementById("password").value.trim();

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      const users = response.data;

      const foundUser = users.find(
        (user) => user.email === inputUsername && user.password === inputPassword
      );

      console.log("Found user:", foundUser);

      if (foundUser) {
        const role = foundUser.permmission/*?.toLowerCase()*/;

        Swal.fire("Login Success!", `Welcome, ${foundUser.name} ${foundUser.permmission}`, "success").then(() => {
          if (role === "user") {
            window.location.href = "userShowData.html";
          } else if (role === "admin") {
            window.location.href = "showdata.html";
          } else {
            Swal.fire("Login Failed", `Unrecognized role: "${foundUser.permmission}"`, "error");
          }
        });
      } else {
        Swal.fire("Login Failed", "Invalid username or password", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  });
}

// Initial load
loadUsers();
