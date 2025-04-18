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

    const userTable = document.getElementById("userTable");
    userTable.innerHTML = "";

    users.forEach((user, index) => {
      userTable.innerHTML += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="text-left">${user.name}</td>
          <td class="text-left">${user.email}</td>
          <td class="text-center"><button class="btn btn-warning btn-sm text-center" onclick="editUser('${
            user.id
          }', '${user.name}', '${user.email}', '${user.password}', '${
        user.age
      }', '${user.role}', '${user.recommend}', '${user.feature}', '${
        user.comments
      }')">Edit</button>
</td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Axios error:", error);
  }
}

// Edit user
function editUser(
  id,
  name,
  email,
  password,
  age,
  role,
  recommend,
  feature,
  comments
) {
  document.getElementById("userId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("password").value = password;
  document.getElementById("age").value = age;
  document.getElementById("role").value = role;
  document.getElementById("recommend").value = recommend;
  document.getElementById("feature").value = feature;
  document.getElementById("comments").value = comments;
}

// Initial load
loadUsers();
