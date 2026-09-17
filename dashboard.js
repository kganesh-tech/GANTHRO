const token =
localStorage.getItem( "token");

console.log(token);

const username =
localStorage.getItem("username");

console.log(username);

document.getElementById("username").textContent = username;

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

document.getElementById("menuUsername").textContent = username;

profileBtn.addEventListener("click", () => {
    profileMenu.classList.toggle("active");
});


async function loadprojects() {

    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/projects", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log("PROJECT DATA:", data);

        const projectsSection =
        document.querySelector(".projects-section");

       data.forEach(project => {

    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const projectName = document.createElement("p");
    projectName.classList.add("project-name");
    projectName.textContent = project.projectname;

    const description = document.createElement("p");
    description.classList.add("project-description");
    description.textContent = project.description;

    const openButton =
    document.createElement("button");

    openButton.classList.add("open-project");
    openButton.textContent = "Open Project";

    openButton.addEventListener("click" , function(event) {
        event.preventDefault();
        localStorage.setItem("projectDetails" , JSON.stringify(project));
        localStorage.setItem("token" , token);
        window.location.href= "projects.html";
    });

    projectCard.appendChild(projectName);
    projectCard.appendChild(description);
    projectCard.appendChild(openButton);

    projectsSection.appendChild(projectCard);
});
    })
    .catch(error => {
        console.log("ERROR:", error);
    });
}

loadprojects();

const createprojectBtn = 
document.getElementById("createprojectBtn");

createprojectBtn.addEventListener("click" , function(event) {

    event.preventDefault();
    localStorage.setItem("TOKEN:" , token);
    localStorage.setItem("username" , username);

    window.location.href="createproject.html";

});



