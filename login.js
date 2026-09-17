const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const passwordError =
        document.getElementById("passwordError");

    passwordError.textContent = "";
    const passwordError1 =
       document.getElementById("passwordError1");
    passwordError1.textContent = "";

    

    const users = {
        username,
        password
    };

    fetch("http://localhost:3000/login/users", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(users)
    })

    .then(res => res.json())

    .then(data => {

        console.log("LOGIN RESPONSE:", data);
        console.log("TOKEN:", data.token);
             
        if (!data.token) {
            passwordError.textContent = data.message;
            passwordError.style.color = "red";
            return;
        }

        localStorage.setItem("token", data.token);

        console.log(
            "TOKEN STORED:",
            localStorage.getItem("token")
        );
        
        if(data.success == true){
            passwordError1.textContent = data.message;
            localStorage.setItem("TOKEN" , data.token);
            localStorage.setItem("username" , username);
               window.location.href= "dashboard.html";
        }
        
          
    })

    .catch(error => {
        console.log("ERROR:", error);
    });
});