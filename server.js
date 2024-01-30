const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const models = require("./models");
const cors = require("cors");
const { authentication } = require("./middleware/authentication");
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json("hello world");
});

app.post("/api/tenant", authentication, async (req, res) => {
  const { email, password, brandName, options } = req.body;
  console.log(email, password, brandName, options);
  try {
    const user = await models.User.create({ userName: email, password });
    const userRole = await models.UserRole.create({roleId:2,userId:user.id})
    console.log(userRole,'user role details')
    if (user) {
      console.log(options);
      for (const [key, value] of Object.entries(options)) {
        console.log(key, "value", value);
        console.log(user.id,'userId')
        const applicationId = await models.Application.findOne({
          where: { name: key },
        });
        console.log(applicationId.id,'applicationId')
        await models.Permissions.create({
          applicationId: applicationId.id,
          userId: user.id,
          isAccess: value,
        });
      }
    }
    res.status(200).json({
      success: true,
      data: "Successfully created New Tenant",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});
app.put("/api/tenant/:id", authentication, async (req, res) => {
  const { id } = req.params;  
  const { email, password, brandName, options } = req.body;
  console.log(email, password, brandName, options);
  try {
    const user = await models.User.update({ userName: email,brandName},{where:{id}});
    if (user) {
      console.log(options);
      for (const [key, value] of Object.entries(options)) {
        console.log(key, "value", value);
        console.log(user.id,'userId')
        const applicationId = await models.Application.findOne({
          where: { name: key },
        });
        console.log(applicationId.id,'applicationId')
        await models.Permissions.update({
          isAccess: value,
        },{where:{userId:id,applicationId:applicationId.id}});
      }
    }
    res.status(200).json({
      success: true,
      data: "Successfully Updated Tenant",
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});

app.get("/api/tenants", authentication, async (req, res) => {
  try {
    const result = await models.User.findAll( {include: [
      {
        model : models.Permissions,
        attributes: ["isAccess"],
        as:'permissions',
      include:[
      {
        model: models.Application,
        as: 'application',
        attributes:['name'],
        required: true,
      }],
    }
    ],}
 );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});
app.get("/api/tenant/:id", authentication, async (req, res) => {
  try {
    console.log('api is started')
    const { id } = req.params;  
  console.log('api is reading id',id)
    const result = await models.User.findOne({where : {id},
    include: [
      {
        model : models.Permissions,
        attributes: ["isAccess"],
        as:'permissions',
      include:[
      {
        model: models.Application,
        as: 'application',
        attributes:['name'],
        required: true,
      }],
    }
    ],
 });
 console.log(result,'result')
 
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: error,
    });
  }
});

app.get( "/api/tenant/:tenantId/permissions", authentication, async (req, res) => {
    try {
      const { tenantId } = req.params;
      console.log('=============================== Resutl')
      console.log(models.Permissions.associations)
      console.log(models.Application.associations)
    
      const result = await models.Permissions.findAll({
        attributes: ["isAccess"],
        where: { userId:tenantId },
        include: [
          {
            model: models.Application,
            as: 'application',
            attributes:['name'],
            required: true,
          },
        ],
      });
    
      console.log('**********completed')
      console.log(result,'result data')
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
        console.log(error,'---------')
      res.status(401).json({
        success: false,
        message: error,
      });
    }
  }
);

app.post("/api/login", async (req, res) => {
  const secretToken = "secret_token";
  const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const { username, password } = req.body;

  try {
    const user = await models.User.findOne({
      where: {
        userName: username,
        password: password,
      },
      include: [
        {
          model: models.UserRole,
          required: true,  
        },
      ],
    
    });
    if (user) {
      console.log("user Roel", user);
      console.log("user data", user.UserRoles)
      console.log("detail;s",user.UserRoles[0]);
      console.log("detail;s",user.UserRoles[0].id);
  
      console.log("user brandName", user.brandName);
      const token = jwt.sign(
        {
          id: username,
          exp: expireTime,
          tenantId: user.id,
        },
        secretToken
      );
      res.status(200).json({
        success: true,
        user: {
          email: username,
          token: token,
          tenantId: user.id,
          brandName: user.brandName,
          roleId: user.UserRoles[0].id
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

app.listen(3030, async () => {
  console.log("server started on 3030");
});
