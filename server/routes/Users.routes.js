const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Tên người dùng đã tồn tại." });
    }

    const newUser = await Users.create({
      username: username,
      password: password,
      role: role,
    });

    res.json({
      status: true,
      data: newUser,
      message: "Thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Tên người dùng không tồn tại." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Mật khẩu không đúng." });
    }

    res.json({
      status: true,
      data: user,
      message: "Đăng nhập thành công.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra." });
  }
});
module.exports = router;
