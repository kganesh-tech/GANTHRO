

const resetpasswordbtn=
document.getElementById("resetpasswordbtn");

resetpasswordbtn.addEventListener("click" , function(event) {
    event.preventDefault();

    const email =
document.getElementById("email").value;

console.log(email);

fetch("http://localhost:3000/forgotpassword/users" , {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },

    body : JSON.stringify({
        email : email
})

})
.then(res => res.json())
.then(data => {
    console.log("BACKEND RESPONSE:" , data);

    document.getElementById("passwordError").textContent = data.message;

    if(res.ok){
        passwordError.style.color = "green";

    } else {
        passwordError.style.color = "red";
    }

    
    
})
.catch(error => {
    console.log("ERROR:" , error);
});
});