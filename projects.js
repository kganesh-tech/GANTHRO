console.log("JS IS LOADED");

const token =
localStorage.getItem("token");

console.log(token);

const project =
JSON.parse(localStorage.getItem("projectDetails"));

console.log(project);

const mainContent =
document.getElementById("mainContent");



const authentication =
document.getElementById("authentication");

const authenticationItems =
document.querySelector(".authentication-items");

const apiKeysLink =
document.getElementById("apikeysLink");


authentication.addEventListener("click", function(event) {
    event.preventDefault();

    authenticationItems.classList.toggle("active");
});



if(project) {

    const projectCard =
    document.createElement("div");

    projectCard.classList.add("project-card");

    const Projectname =
    document.createElement("h2");

    Projectname.classList.add("project-name");

    Projectname.textContent =
    `Project name :  ${project.projectname}`;

    const projectId =
    document.createElement("h2");

    projectId.classList.add("project-id");

    projectId.textContent =
    `projectId : ${project.projectId}`;

    const message =
    document.createElement("h1");

    message.textContent =
    `welcome ${project.username}`;


    const projectInfo =
    document.createElement("div");

    projectInfo.classList.add("project-info");

    projectInfo.appendChild(Projectname);
    projectInfo.appendChild(projectId);


    projectCard.appendChild(projectInfo);

    mainContent.appendChild(message);
    mainContent.appendChild(projectCard);
}



apiKeysLink.addEventListener("click", function(event) {

    event.preventDefault();

    mainContent.innerHTML = "";


    const apiHeader =
    document.createElement("div");

    apiHeader.classList.add("api-header");


    const heading =
    document.createElement("div");

    heading.classList.add("heading-text");

    heading.textContent =
    "API Keys";


    const createApiButton =
    document.createElement("button");

    createApiButton.classList.add("createApi");

    createApiButton.textContent =
    "Create Api Key";


    apiHeader.appendChild(heading);
    apiHeader.appendChild(createApiButton);

    mainContent.appendChild(apiHeader);



    

    const apikeyssection =
    document.createElement("section");

    apikeyssection.classList.add("api-keys");

    apikeyssection.id = "apikeyssection";

    mainContent.appendChild(apikeyssection);



    const apiKeyModal =
    document.getElementById("apiKeyModal");


    createApiButton.addEventListener("click", function(event) {

        event.preventDefault();

        apiKeyModal.classList.add("active");

    });



    const closeApiKeyModal =
    document.getElementById("closeApiKeyModal");


    const cancelApiKeyModal =
    document.getElementById("cancelApiKeyModal");


    cancelApiKeyModal.addEventListener("click", function(event) {

        event.preventDefault();

        apiKeyModal.classList.remove("active");

    });


    closeApiKeyModal.addEventListener("click", function() {

        apiKeyModal.classList.remove("active");

    });



    const createApiKey =
    document.getElementById("createApiKey");


    const apiSuccessModal =
    document.getElementById("apiSuccessModal");


    const closeBtn =
    document.getElementById("closeBtn");


    const copyBtn =
    document.getElementById("copyBtn");



    createApiKey.addEventListener("click", function(event) {

        event.preventDefault();


        const apiKeyName =
        document.getElementById("apiKeyName").value;


        const apiKeyEnvironment =
        document.getElementById("apiKeyEnvironment").value;


        const apiKeyDetails = {

            apiKeyName,
            apiKeyEnvironment

        };


        console.log(apiKeyDetails);


        const project =
        JSON.parse(localStorage.getItem("projectDetails"));


        console.log(project.userId);


        const userId =
        project.userId;


        const projectId =
        project.projectId;


        console.log(projectId);



        fetch(`http://localhost:3000/apiKey/${userId}/${projectId}`, {

            method : "POST",

            headers : {

                "Content-Type" : "application/json"

            },

            body : JSON.stringify(apiKeyDetails)

        })

        .then(res => res.json())

        .then(data => {

            alert(data.message);

            console.log(data);


            apiSuccessModal.classList.add("active");



            document.getElementById("apiKeyValue").value =
            data.apikey;



            closeBtn.addEventListener("click", function() {

                apiSuccessModal.classList.remove("active");

            });



            copyBtn.addEventListener("click", async function() {

                await navigator.clipboard.writeText(
                    apiKeyValue.value
                );

                copyBtn.textContent =
                "Copied!";

            });

        })

        .catch(error =>
            console.error(error)
        );

    });



    const projectDetails =
    localStorage.getItem("projectDetails");


    const projectId =
    project.projectId;



    fetch(`http://localhost:3000/apikeys/${projectId}`, {

        method : "GET",

        headers : {

            "Authorization" : `Bearer ${token}`

        }

    })

    .then(res => res.json())

    .then(data => {

        console.log(data);


        data.forEach(apikey => {


            const apikeyCard =
            document.createElement("div");

            apikeyCard.classList.add(
                "api-key-card"
            );



            const apiKeyName =
            document.createElement("p");

            apiKeyName.classList.add(
                "apikeyname"
            );

            apiKeyName.textContent =
            apikey.apiKeyName;



            const apiKeyEnvironment =
            document.createElement("p");

            apiKeyEnvironment.classList.add(
                "apikeyenvironment",
                apikey.apiKeyEnvironment.toLowerCase()
            );

            apiKeyEnvironment.textContent =
            apikey.apiKeyEnvironment;



            const apiKey =
            document.createElement("p");

            apiKey.classList.add(
                "apikey"
            );

            apiKey.textContent =
            apikey.apiKey;



            const status =
            document.createElement("p");

            status.classList.add(
                "status"
            );

            status.textContent =
            apikey.status;



            const revokeButton =
            document.createElement("button");

            revokeButton.classList.add(
                "revokeBtn"
            );

            revokeButton.textContent =
            "REVOKE";



            apikeyCard.appendChild(
                apiKeyEnvironment
            );

            apikeyCard.appendChild(
                apiKeyName
            );

            apikeyCard.appendChild(
                apiKey
            );

            apikeyCard.appendChild(
                status
            );

            apikeyCard.appendChild(
                revokeButton
            );

            apikeyssection.appendChild(
                apikeyCard
            );

        });

    });

});
