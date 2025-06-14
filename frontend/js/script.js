// document.addEventListener('DOMContentLoaded', function () {
// const fileInput = document.getElementById('photo-upload');
//     const previewImg = document.getElementById('preview-img');
  
//     fileInput.addEventListener('change', function () {
//       const file = this.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//           previewImg.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   });

  function handleNavigation(section) {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      alert("Please login first to view events.");
      window.location.href = "../pages/login.html";
      return;
    }
  
    else if (section === 'events') {
      // window.location.href = "../event.html"; // replace with your actual events page
      if (user.role === 'student') {
        window.location.href = '../student-dashbord/event_student.html';
      } 
      else if (user.role === 'faculty') {
        window.location.href = '../faculty-dashbord/event_faculty.html';
      }
    } else if (section === 'qna') {
      window.location.href = "../pages/q&a.html"; // replace with your actual events page
    }
  }
  

  
  