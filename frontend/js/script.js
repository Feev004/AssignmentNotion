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
          <td>
            <button onclick="editUser('${user.id}', '${user.name}', '${user.email}', '${user.age}', '${user.role}', '${user.recommend}', '${user.feature}', '${user.comments}')">Edit</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
          </td>
        </tr>
      `;
    });
    
  } catch (error) {
    console.error("Axios error:", error);
  }
}

// Handle form submission (Create/Update)
document.getElementById("userForm").onsubmit = async (e) => {
  e.preventDefault();

  const id = document.getElementById("userId").value;
  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    role: document.getElementById("role").value,
    recommend: document.getElementById("recommend").value,
    feature: document.getElementById("feature").value,
    comments: document.getElementById("comments").value,
  };

  try {
    if (id) {
      await axios.put(`${apiUrl}/${id}`, userData);
      //alert("Update Successful!");
      Swal.fire({
        title: "Update Successful!",
        icon: "success",
        draggable: true,
      });
    } else {
      await axios.post(apiUrl, userData);
      //alert("User Created Successfully!");
      Swal.fire({
        title: "User Created Successfully!",
        icon: "success",
        draggable: true,
      });
    }

    document.getElementById("userForm").reset();
    document.getElementById("userId").value = "";
    loadUsers();
  } catch (error) {
    //alert(error.response?.data?.error || 'Request failed');

    Swal.fire({
      title: error.response?.data?.error || "Request failed",
      icon: "success",
      draggable: true,
    });
  }
};

// Edit user data
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

// Delete user
async function deleteAPI(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    loadUsers();
  } catch (error) {
    console.error(error);
  }
}

function deleteUser(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Delete this user?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAPI(id); // <-- เพิ่ม id ตรงนี้
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}


// Initial load
loadUsers();
