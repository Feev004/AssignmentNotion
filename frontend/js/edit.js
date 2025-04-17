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
          <td class="text-center">${index + 1}</td>
          <td class="text-left">${user.name}</td>
          <td class="text-left">${user.email}</td>
          <td class="text-center"><button class="btn btn-warning btn-sm text-center" onclick="editUser('${user.id}', '${user.name}', '${user.email}', '${user.age}', '${user.role}', '${user.recommend}', '${user.feature}', '${user.comments}')">Edit</button>
</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Axios error:", error);
  }
}

document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("age").value);  
    const role = document.getElementById("role").value;
    const recommend = document.getElementById("recommend").value;
    const feature = document.getElementById("feature").value;
    const comments = document.getElementById("comments").value;
  
    const userData = { name, email, age, role, recommend, feature, comments };
  
    try {
      if (userId) {
        // Update user
        await axios.put(`${apiUrl}/${userId}`, userData);
        Swal.fire("Updated!", "User has been updated.", "success");
      } else {
        // Create new user
        await axios.post(apiUrl, userData);
        Swal.fire("Created!", "User has been created.", "success");
      }
  
      loadUsers(); // Reload data
      this.reset(); // Reset form
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "There was a problem.", "error");
    }
  });
  function editUser(id, name, email, age, role, recommend, feature, comments) {
    document.getElementById("userId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("age").value = age;
    document.getElementById("role").value = role;
    document.getElementById("recommend").value = recommend;
    document.getElementById("feature").value = feature;
    document.getElementById("comments").value = comments;
  }
  

// Initial load
loadUsers();
