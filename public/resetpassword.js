console.log("RESET PASSWORD JS LOADED");

const params = new URLSearchParams(window.location.search);

const resetToken = params.get("token");
const email = params.get("email");

console.log("RESET TOKEN:", resetToken);
console.log("EMAIL:", email);

document.getElementById("email").value = email;

const savepasswordbtn =
document.getElementById("savepasswordbtn");

savepasswordbtn.addEventListener("click" , function(event) {
    event.preventDefault();

    const newpassword =
    document.getElementById("newpassword").value;
    const confirmnewpassword =
    document.getElementById("confirmnewpassword").value;
    const passwordError =
    document.getElementById("passwordError");

    if(newpassword !== confirmnewpassword){
     passwordError.textContent = "password donot match";
     return;
    }

    passwordError.textContent = "";

    fetch(`http://localhost:3000/resetpassword/${resetToken}` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify({
            email : email,
            newpassword : newpassword
        })

    })

    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.log("ERROR:" , error);
    });
});
