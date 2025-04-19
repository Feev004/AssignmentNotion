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
        //ขั้นที่ 1 หลัง login สำเร็จ เช็คว่าต้องไปเช็ค cookie ว่ามีค่าหรือไม่ ถ้า login ผ่านก็ให้เซ็ท cookie ให้ ชื่อ cookie_email, cookie_date_end และก็วันหมดอายุก็ให้เช็คเวลาปัจจุบัน +2 วัน
        //เช็คว่าถ้ามี cookie อยู่แล้วให้ ให้เซ็ทใหม่ทุกครั้งที่ login สำเร็จ
        // ขั้นที่ 2 
        //ถ้ามีการเข้าที่หน้า user ถ้าเช็คว่าไม่มี cookie ก็ให้ไปที่หน้า login ใหม่
        //ถ้าไม่มีหรือหมดอายุ cookie ก็ให้ไปที่หน้า login ใหม่
        Swal.fire("Login Success!", `Welcome, ${foundUser.name} ${foundUser.permmission}`, "success").then(() => {
          if (role === "user") {
            const now = new Date();
            const expireDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 วัน
            document.cookie = `cookie_email=${inputUsername}; expires=${expireDate.toUTCString()}; path=/`;
            document.cookie = `cookie_date_end=${expireDate.toISOString()}; expires=${expireDate.toUTCString()}; path=/`;
            window.location.href = "userShowData.html";
          } else if (role === "admin") {
            const now = new Date();
            const expireDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 วัน
            document.cookie = `cookie_email=${inputUsername}; expires=${expireDate.toUTCString()}; path=/`;
            document.cookie = `cookie_date_end=${expireDate.toISOString()}; expires=${expireDate.toUTCString()}; path=/`;
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
