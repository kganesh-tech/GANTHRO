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

    const apiRequestCard = document.createElement("div");

apiRequestCard.classList.add("stat-card");


const apiIcon = document.createElement("div");

apiIcon.classList.add("stat-icon");

apiIcon.textContent = "⚡";



const apiTitle = document.createElement("h3");

apiTitle.textContent = "API Requests";



const apiCount = document.createElement("h2");

apiCount.textContent = "0";



const apiBottom = document.createElement("div");

apiBottom.classList.add("stat-bottom");



const apiPeriod = document.createElement("span");

apiPeriod.textContent = "Last 7 days";


const apiPercentage = document.createElement("span");

apiPercentage.classList.add("stat-percentage");

apiPercentage.textContent = "↑ 0%";


apiBottom.appendChild(apiPeriod);

apiBottom.appendChild(apiPercentage);



apiRequestCard.appendChild(apiIcon);

apiRequestCard.appendChild(apiTitle);

apiRequestCard.appendChild(apiCount);

apiRequestCard.appendChild(apiBottom);

const usersCard = document.createElement("div");

usersCard.classList.add("stat-card");



const usersIcon = document.createElement("div");

usersIcon.classList.add("stat-icon");

usersIcon.textContent = "👥";



const usersTitle = document.createElement("h3");

usersTitle.textContent = "Users";



const usersCount = document.createElement("h2");

usersCount.textContent = "0";



const usersBottom = document.createElement("div");

usersBottom.classList.add("stat-bottom");


const usersPeriod = document.createElement("span");

usersPeriod.textContent = "Total users";


const usersPercentage = document.createElement("span");

usersPercentage.classList.add("stat-percentage");

usersPercentage.textContent = "↑ 0%";



usersBottom.appendChild(usersPeriod);

usersBottom.appendChild(usersPercentage);



usersCard.appendChild(usersIcon);

usersCard.appendChild(usersTitle);

usersCard.appendChild(usersCount);

usersCard.appendChild(usersBottom);

const apiKeysCard = document.createElement("div");

apiKeysCard.classList.add("stat-card");



const apiKeysIcon = document.createElement("div");

apiKeysIcon.classList.add("stat-icon");

apiKeysIcon.textContent = "🔑";



const apiKeysTitle = document.createElement("h3");

apiKeysTitle.textContent = "API Keys";



const apiKeysCount = document.createElement("h2");

apiKeysCount.textContent = "1";



const apiKeysBottom = document.createElement("div");

apiKeysBottom.classList.add("stat-bottom");



const apiKeysPeriod = document.createElement("span");

apiKeysPeriod.textContent = "Active keys";



const apiKeysPercentage = document.createElement("span");

apiKeysPercentage.classList.add("stat-percentage");

apiKeysPercentage.textContent = "↑ 0%";



apiKeysBottom.appendChild(apiKeysPeriod);

apiKeysBottom.appendChild(apiKeysPercentage);



apiKeysCard.appendChild(apiKeysIcon);

apiKeysCard.appendChild(apiKeysTitle);

apiKeysCard.appendChild(apiKeysCount);

apiKeysCard.appendChild(apiKeysBottom);

const failedRequestsCard = document.createElement("div");

failedRequestsCard.classList.add("stat-card");



const failedRequestsIcon = document.createElement("div");

failedRequestsIcon.classList.add("stat-icon");

failedRequestsIcon.textContent = "⚠️";



const failedRequestsTitle = document.createElement("h3");

failedRequestsTitle.textContent = "Failed Requests";



const failedRequestsCount = document.createElement("h2");

failedRequestsCount.textContent = "0";



const failedRequestsBottom = document.createElement("div");

failedRequestsBottom.classList.add("stat-bottom");



const failedRequestsPeriod = document.createElement("span");

failedRequestsPeriod.textContent = "Last 7 days";



const failedRequestsPercentage = document.createElement("span");

failedRequestsPercentage.classList.add("stat-percentage");

failedRequestsPercentage.textContent = "↑ 0%";



failedRequestsBottom.appendChild(failedRequestsPeriod);

failedRequestsBottom.appendChild(failedRequestsPercentage);



failedRequestsCard.appendChild(failedRequestsIcon);

failedRequestsCard.appendChild(failedRequestsTitle);

failedRequestsCard.appendChild(failedRequestsCount);

failedRequestsCard.appendChild(failedRequestsBottom);


















    



    const projectInfo =
    document.createElement("div");

    projectInfo.classList.add("project-info");

    projectInfo.appendChild(Projectname);
    projectInfo.appendChild(projectId);
  
    const statsSection =
     document.createElement("div");

     statsSection.classList.add("stats-section");

    statsSection.appendChild(apiRequestCard);
    statsSection.appendChild(usersCard);
    statsSection.appendChild(apiKeysCard);
    statsSection.appendChild(failedRequestsCard);
    




    projectCard.appendChild(projectInfo);
    projectCard.appendChild(statsSection);

    mainContent.appendChild(message);
    mainContent.appendChild(projectCard);
}

const usersLink =
document.getElementById("usersLink");

usersLink.addEventListener("click" , function(event) {
    event.preventDefault();

   mainContent.innerHTML = "";

  const userHeader =
  document.createElement("div");

  userHeader.classList.add("user-header");

  const message = 
  document.createElement("h1");

  message.classList.add("msg");

  message.textContent = "welcome";

  userHeader.appendChild(message);
  mainContent.appendChild(userHeader);

  const userCard =
  document.createElement("div");

  userCard.classList.add("user-card");

  const users = 
  document.createElement("h1");

  users.textContent = "USERS";

  const userCount =
  document.createElement("h3");

  userCount.textContent = "0";

  userCard.appendChild(users);
  userCard.appendChild(userCount);
  mainContent.appendChild(userCard);

  const usersSection =
   document.createElement("div");
   usersSection.classList.add("users-section");

   const usersTitle =
   document.createElement("h2");
   usersTitle.textContent = "Users";

   usersSection.appendChild(usersTitle);

   mainContent.appendChild(usersSection);

   const projectId = project.projectId;

   console.log(projectId);

   fetch(`https://ganthro.onrender.com/projectusers/${projectId}`, {

    method : "GET" ,
    headers : {
        "Content-Type" : "application/json"
    },

   })

   .then(res => res.json())
   .then(data => {
    userCount.textContent = data.length;
        data.forEach(user => {
            const projectuserSection =
              document.createElement("div");

            projectuserSection.classList.add("project-section");

            const username =
            document.createElement("p");

            username.textContent =`username : ${user.username}` ;

            const email = 
            document.createElement("p");

            email.textContent = `email: ${user.email}`;

            const password =
            document.createElement("p");

            password.textContent =`password : ${user.password}`;

            projectuserSection.appendChild(username);
            projectuserSection.appendChild(email);
            projectuserSection.appendChild(password);

            mainContent.appendChild(projectuserSection);
        });
   });
     

    
    

   

  

});



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



        fetch(`https://ganthro.onrender.com/apiKey/${userId}/${projectId}`, {

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



    fetch(`https://ganthro.onrender.com/apikeys/${projectId}`, {

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
