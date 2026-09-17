

const resetpasswordbtn =
document.getElementById("resetpasswordbtn");

resetpasswordbtn.addEventListener("click", function(event) {
    event.preventDefault();

    const email =
document.getElementById("email").value;

    console.log(email);

    fetch("https://ganthro.onrender.com/forgotpassword/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email
        })

    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
        }

        return res.json();
    })
    .then(data => {
        console.log("BACKEND RESPONSE:", data);

        const passwordError =
            document.getElementById("passwordError");

        passwordError.textContent = data.message;

        passwordError.style.color = "green";
    })
    .catch(error => {
        console.log("ERROR:", error);

        const passwordError =
            document.getElementById("passwordError");

        passwordError.textContent =
            "Something went wrong. Please try again.";

        passwordError.style.color = "red";
    });
});
