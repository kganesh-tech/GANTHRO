require("dotenv").config();
const express = require("express");

const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const sendEmail = require("./utils/nodemailer");
const authMiddleware = require("./utils/authmiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const client = new MongoClient(process.env.MONGODB_URI
    
);

let users;
let projects;
let apikeys;

async function connectDB() {
    try {
        await client.connect();

        const db = client.db("GANTHRO");
        users = db.collection("users");
        projects = db.collection("projects");
        apikeys = db.collection("apikeys");

        console.log("Mongodb connected successfully");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

app.post("/signup/users" , async(req,res) => {
    try{
    const {fullname,username,email,password , confirm} = req.body;

    const existinguser = await users.findOne({username : username});
    if(existinguser){
        return res.status(400).json({
            message : "user already exists"
        })
    }
    const hashedpassword = await bcrypt.hash(password , 10);

    const newuser = {
        userId : "usr_" + crypto.randomBytes(8).toString("hex"),
        fullname : fullname,
        username : username,
        email : email,
        password : hashedpassword,
        createdAt : Date.now()

    };

    const token = jwt.sign(
        {
            userId : newuser.userId,
            username : newuser.username
        },

        process.env.JWT_SECRET,
        {
            expiresIn : "1h"
        }
    );
    

    await users.insertOne(newuser);
    return res.status(201).json({
        success : true,
        message : "Account Created succesfully",
        token : token,
        user : {
            username : newuser.username
        }
    });

} catch (error) {
    console.log("Signup error:", error);

    return res.status(500).json({
        success : false,
        message : "Internal server error"
    });
} 
});


app.post("/login/users" , async(req,res) => {
    try{
       const { username , password } = req.body;

      

       const user = await users.findOne({username : username});

      console.log("USER FROM DATABASE:", user);
      console.log("USER ID:", user?.userId);
       if(!user){
        return res.status(401).json({
            message : "Invalid username or password"
        })
       }
       const isMatch = await bcrypt.compare(password , user.password);
if (!isMatch) {
    return res.status(401).json({
        message: "Invalid username or password"
    });
}

const token = jwt.sign(
    {
        userId: user.userId,
        username: user.username
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

console.log("GENERATED TOKEN:", token);

return res.status(200).json({
    success : true,
    message: "Login successful",
    token: token
});
       } catch (error) {
    console.log("Login error:", error);

    return res.status(500).json({
        success : false,
        message : "Internal server error"
    });

    }
});
connectDB();
app.post("/forgotpassword/users", async (req, res) => {

    const email = req.body.email;

    console.log("EMAIL RECEIVED", email);

    const user = await users.findOne({
        email: email
    });

    if (!user) {
        return res.status(404).json({
            message: "email not found"
        });
    }

    console.log("USER FOUND:" , user.email);

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    const resetLink =
`http://localhost:3000/resetpassword.html?token=${resetToken}&email=${user.email}`;

console.log("RESET LINK:", resetLink);

await sendEmail(user.email, resetLink);
    await users.updateOne(
        {email : email},
        {
            $set: {
                resetToken : resetToken,
                resetTokenExpiry : resetTokenExpiry
            }
        }
    );

    return res.status(200).json({
        message: "Reset email sent successfully",
        data : user
    });
});

app.post("/resetpassword/:resetToken", async(req,res) => {

    const resetToken = req.params.resetToken;
    const email = req.body.email;
    const newpassword = req.body.newpassword;

    console.log("TOKEN FROM URL:" , resetToken);
    console.log("EMAIL FROM BODY:", email);

    const user = await users.findOne({
        email: email,
        resetToken: resetToken
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid reset token or email"
        });
    }

    console.log("USER FOUND:", email);

    if (Date.now() > user.resetTokenExpiry) {
        return res.status(400).json({
            message: "Reset link has expired"
        });
    }

    const hashedpassword =
        await bcrypt.hash(newpassword, 10);

    await users.updateOne(
        { resetToken: resetToken },
        {
            $set: {
                password: hashedpassword
            },
            $unset: {
                resetToken: "",
                resetTokenExpiry: ""
            }
        }
    );

    return res.status(200).json({
        message: "Password reset successfully"
    });
});
app.get("/users/projects" ,authMiddleware , async(req,res) => {
      console.log(req.user);
res.status(200).json({
    
    user : req.user
});
});



app.post("/projects/:username" , authMiddleware ,   async(req,res) => {
    try{
    const {projectname , description} = req.body;
    const username = req.user.username;
    const userId = req.user.userId;

    

    

    await projects.insertOne({
        projectId : "prj_" + crypto.randomBytes(8).toString("hex"),
        userId : userId,
        username : username,
        projectname : projectname,
        description : description,
        createdAt : Date.now(),
        status : "active"

    });

   

    return res.status(200).json({
        message : "project saves successfully"
    });
} catch (error) {
    console.log("PROJECT CREATION ERROR:", error);

    res.status(500).json({
        message : "Failed to create project"
    });
};

   
});

app.get("/projects" , authMiddleware , async (req,res) => {
    try{
        const userId = req.user.userId;
        console.log("LOGGEDIN USER :" , userId);
        const projectData = await projects.find({userId: userId}).toArray();

        console.log("PROJECT DATA:" , projectData);

        res.json(projectData);

    }catch (error) {
        console.log("ERROR:", error);

        res.status(500).json({
            messag : "Failed to fetch projects"
        });
    }
});

app.post("/apikey/:userId/:projectId" , async(req,res) => {
    const userId = req.params.userId;
   const projectId = req.params.projectId;
    const apiKeyName = req.body.apiKeyName;
    const apiKeyEnvironment = req.body.apiKeyEnvironment;

    const  apiKey = "GANT_" + crypto.randomBytes(16).toString("hex");

    const hashedapikey = await bcrypt.hash(apiKey , 10);

    const apiKeyinfo = {
        userId : userId,
        projectId : projectId,
        apiKey : hashedapikey,
        apiKeyName : apiKeyName,
        apiKeyEnvironment : apiKeyEnvironment,
        createdAt : Date.now(),
        status : "Active"


    }

    await apikeys.insertOne(apiKeyinfo);

    

    return res.status(200).json({
        message : "apiKey have generated successfully",
        apikey: apiKey
        
    });
});

app.get("/apikeys/:projectId", authMiddleware, async (req, res) => {

    const userId = req.user.userId;
    const projectId = req.params.projectId;

    const apiKeyList = await apikeys.find({
        userId: userId,
        projectId: projectId
    }).toArray();

    console.log("API KEYS FROM DB:", apiKeyList);

    return res.status(200).json(apiKeyList);
});


