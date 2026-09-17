const token =
localStorage.getItem("token");
const username =
localStorage.getItem("username");



console.log(token);
console.log(username);
const createprojectbtn =
document.getElementById("createprojectbtn");

createprojectbtn.addEventListener("click" , function(event) {
    event.preventDefault();

    const projectname =
    document.getElementById("projectname").value;
    const description =
    document.getElementById("description").value;

    const token =
    localStorage.getItem("token");

    if(!token){
        alert("Please login again");
        return;
    }
   const projects = {
    projectname,
    description
   }
   

    

    
  
    fetch(`http://localhost:3000/projects/${username}` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
            
             
        },
        body : JSON.stringify(projects)
        
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.log("ERROR:" , error);
    });

});
