const apiUrl = "https://desired-monthly-griffon.ngrok-free.app/api/users";

// Load and display users
async function loadUsers() {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    console.log("API response:", response.data); // <-- Check browser console here!

    const users = response.data;

    // if (!Array.isArray(users)) {
    //   console.error("Response is not an array:", users);
    //   return;
    // }

    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    users.forEach((user, index) => {
      userTable.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.role}</td>
          <td>${user.recommend}</td>
          <td>${user.feature}</td>
          <td>${user.comments}</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Axios error:", error);
  }
}

// Initial load
loadUsers();

{/* <td>
<a href="Edit.html?id=${user.id}" class="btn btn-sm btn-warning">Edit</a>
<a href="Delete.html?id=${user.id}" class="btn btn-sm btn-info">View</a>
</td> */}