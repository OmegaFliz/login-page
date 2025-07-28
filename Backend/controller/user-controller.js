const { where } = require("sequelize");
const db = require("../models");
const Op = db.Sequelize.Op;

const User = db.user;
const Data = db.data;
// const Role = db.role;

const signUp = async (req, res) => {
  try {
    const userTest = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userTest) {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
    } else {
      res.json({ message: "Username is already used!" });
    }

    // if (req.body.role && req.body.role.length > 0) {
    //   const roles = await Role.findAll({
    //     where: {
    //       name: {
    //         [Op.or]: req.body.role,
    //       },
    //     },
    //   });

    //   if (roles) {
    //     const result = await user.setRoles(roles);
    //     if (result) {
    //       res.send({ message: "User was Registered successfully!" });
    //     } else {
    //       return res.status(500).send({ message: "failed to set user roles." });
    //     }
    //   }
    // } else {
    //   const result = user.setRoles([1]);
    //   if (result) res.send({ message: "User was Registered successfully!" });
    // }

    res.status(200).json({ message: "register successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send({ message: "register error", error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(user);

    if (!user) {
      res.json({ message: "User not found!" });
    }

    if (user.password !== req.body.password) {
      res.json({ message: "invalid password" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch {
    res.json({ message: "Sign in error" });
  }
};

const postData = async (req, res) => {
  try {
    console.log("Received user_id:", req.params.id);
    console.log("Received content:", req.body.content);

    const data = await Data.create({
      user_id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(200).json(data);
  } catch {
    res.json({ message: "Post data error!" });
  }
};

const getPostData = async (req, res) => {
  const data = await Data.findAll({
    where: {
      user_id: req.params.id,
    },
    raw: true,
  });
  console.log(typeof data);
  res.json(data);
};

const getOnePost = async (req, res) => {
  const data = await Data.findAll({
    where: {
      id: req.params.post_id,
    },
    raw: true,
  });
  console.log(typeof data);
  res.json(data);
};

const deletePost = async (req, res) => {
  await Data.destroy({
    where: {
      id: req.params.post_id,
    },
  });
  res.json({ msg: "delete successful" });
};

const updatePost = async (req, res) => {
  try {
    const data = await Data.findOne({
      where: {
        id: req.params.post_id,
      },
    });

    if(data){
      
      data.update({title: req.body.title, content: req.body.content})
    }

    res.json(data);
  } catch {
    res.json({ msg: "error update" });
  }
};

module.exports = {
  signUp,
  signIn,
  postData,
  getPostData,
  getOnePost,
  deletePost,
  updatePost,
};
