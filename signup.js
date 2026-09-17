const form =
document.getElementById("signupForm");

form.addEventListener("submit" , function(event) {
    event.preventDefault();
    const fullname =
    document.getElementById("fullname").value;
    const username =
    document.getElementById("username").value;
    const email =
    document.getElementById("email").value;
    const password =
    document.getElementById("password").value;
    const confirmpassword =
    document.getElementById("confirmpassword").value;
    const passwordError =
    document.getElementById("passwordError");
    const terms =
    document.getElementById("terms").checked;

    if(password !== confirmpassword){
        
        passwordError.textContent = "Passwords do not match";
        return;
    
    }
    passwordError.textContent = "";

    const users = {
        fullname,
        username,
        email,
        password,
        
        terms : "agreed"
    }

    console.log("USER DETAILS" , users);

    fetch("http://localhost:3000/signup/users" , {
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify(users)
    })

    .then(res => res.json())
    .then(data => {
        alert(data.message);

        console.log("token" , data.token);
        if(data.success == true){
           localStorage.setItem("username" , username);
       localStorage.setItem("token" , data.token);
        window.location.href ="dashboard.html";
        };
    })
    .catch(error => {
        console.log("ERROR:" , error)
    });
});