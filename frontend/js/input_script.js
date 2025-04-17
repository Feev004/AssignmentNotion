const apiUrl = "https://desired-monthly-griffon.ngrok-free.app/api/users";


// Handle form submission (Create/Update)
document.getElementById("userForm").onsubmit = async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("userId").value;
    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: parseInt(document.getElementById("age").value),
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
    } catch (error) {
      //alert(error.response?.data?.error || 'Request failed');
    console.log(error.response?.data?.error)
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: error.response?.data?.error || "ไม่สามารถบันทึกข้อมูลได้",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "รับทราบ",
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

  