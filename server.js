const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const  models  = require("./models");
const cors = require("cors");
const { authentication } = require("./middleware/authentication");
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.json("hello world");
});

app.post("/api/tenant", authentication, async (req, res) => {
    const {email,password,brandName,options} =req.body
    console.log(email,password,brandName,options)
    try {
        const tenant = await models.Tenant.create({email,password,brandName})
       if(tenant){
        console.log(options)
        for (const [key, value] of Object.entries(options)) {
            console.log(key, 'value', value);
            await models.Permissions.create({appName:key,tenantId:tenant.id,isAccess:value})     
        }
       }
       res.status(200).json({
        success: true,
        data: 'Successfully created New Tenant'
    });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
});
app.get("/api/tenants", authentication, async (req, res) => {
    try {
        
       const result = await models.Tenant.findAll({attributes:['brandName','email']})
       res.status(200).json({
        success: true,
        data: result
    });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
});
app.get("/api/tenant/:tenantId/permissions", authentication, async (req, res) => {
    try {
        const { tenantId } = req.params;
       const result = await models.Permissions.findAll({attributes:['appName','isAccess'],where:{tenantId}})
       res.status(200).json({
        success: true,
        data: result
    });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error,
        });
    }
});

app.post("/api/login",async (req, res) => {
    const secretToken = "secret_token";
    const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const { username, password } = req.body;
  
    try {
        const user = await models.Tenant.findOne({
            where: {
                email: username,
                password: password
            },
        });
        if (user) {
            console.log('user brandName', user)
            console.log('user brandName', user.brandName)
            const token = jwt.sign(
                {
                    id: username,
                    exp: expireTime,
                    tenantId: user.id
                },
                secretToken
            );
            res.status(200).json({
                success: true,
                user: {
                    email: username,
                    token: token,
                    tenantId:user.id,
                    brandName: user.brandName,     
                },
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid username or password",
        });
    }
});

app.listen(3030, async () => {
    console.log("server started on 3030");
});
