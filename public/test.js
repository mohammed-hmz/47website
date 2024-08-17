


// const log=document.getElementById("logform");
// log.addEventListener('submit', function (event) {
//   event.preventDefault(); // Prevent the default form submission

//   const formData = new FormData(log);
//   const data =Object.fromEntries(formData)
//  const datas= JSON.stringify(data);
//   // Handle form submission with Fetch API
//   fetch('/home', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body:datas
//    }).then(response => response.json())
//    .then(result => {
//      if (result.success) {
//        // Redirect to the home page upon successful login
//      } else {
//        // Handle login failure
//        alert('Login failed: ' + result.message);
//      }
//    })

//       // if (result.success) {
//       //     // Redirect to the home page upon successful sign-in
//       // } else {
//       //     // Handle sign-in failure
//       //     alert('Sign-in failed: ' + result.message);
//       // 
// });
