const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const Admin = require("../../models/Admin");
const Menu = require("../../models/Menu");
const WebModel = require("../../models/WebModel");
const Controls = require("../../models/Controls");
exports.forgotPasswordGetController = async (req, res, next) => {
  try {
    let menu = await Menu.find();
    let webModel = await WebModel.findOne();
    let control = await Controls.findOne();
    if (!control.forgotPassword) {
      return res.redirect("/");
    }
    res.render("pages/administrator/forgotPassword.ejs", {
      title: "Forgot-Password",
      style: "bg-light",
      error: {},
      menu,
      flashMessage: {},
      webModel,
      data: "",
      loginURI: "/auth/login",
    });
  } catch (e) {
    next(e);
  }
};
exports.forgotPasswordPostController = async (req, res, next) => {
  try {
    let menu = await Menu.find();
    let webModel = await WebModel.findOne();
    let control = await Controls.findOne();

    if (!control.forgotPassword) {
      return res.redirect("/");
    }

    if (!control.publicMail.email || !control.publicMail.password) {
      req.flash("fail", "Sorry! Change password system is not available");
      return res.redirect("back");
    }

    let { email } = req.body;
    let error = validationResult(req).formatWith((err) => err.msg);
    if (!error.isEmpty()) {
      req.flash("fail", "Invalid Creadentials");
      return res.render("pages/administrator/forgotPassword.ejs", {
        title: "Forgot-Password",
        style: "bg-light",
        error: error.mapped(),
        data: email,
        menu,
        flashMessage: req.flash(),
        webModel,
        loginURI: "/auth/login",
      });
    }
    // Cheked Is Email Found Or Not
    let admin = await Admin.findOne({ email: email });
    if (!admin) {
      req.flash("fail", "Invalid Creadentials");
      return res.render("pages/administrator/forgotPassword.ejs", {
        title: "Forgot-Password",
        style: "bg-light",
        error: {},
        data: email,
        menu,
        webModel,
        flashMessage: req.flash(),
      });
    }
    let token = jwt.sign({ email: admin.email, id: admin._id }, "minhajislam", {
      expiresIn: "1h",
    });
    // Reset Password Confirmation Email Sent To Server in Clint
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: control.publicMail.email,
        pass: control.publicMail.password,
      },
    });
    let sendMailToClint = await transporter.sendMail({
      from: control.publicMail.email,
      to: email,
      subject: "[JASA] Confirmation Link Of Reset Password",

      html: `
			<P>We heard that you lost your Administrator password. Sorry about that!</P>
			<p>But don’t worry! You can use the following link to reset your password:</p>
			<a href="http://localhost:8080/auth/reset_password/${token}">http://localhost:8080/auth/reset_password/${token}</a>
			
			<p>If you don’t use this link within 1 hours, it will expire. To get a new password reset link, visit <a href="http://localhost:8080/auth/forgot_password">http://localhost:8080/auth/forgot_password</a> </p>
			<p>
			Thanks,<br/>
			The JASA Edu
			</p>
			`,
    });
    // Need to Handler this Error

    if (!sendMailToClint.response) {
      req.flash("fail", "Invalid Creadentials");
      return res.redirect("back");
    }
    res.render("pages/web/confirmationEmail.ejs", {
      title: "Confirmation Email",
      style: "bg-light",
      error: {},
      menu,
      webModel,
      flashMessage: {},
      loginURI: "/auth/login",
    });
  } catch (e) {
    next(e);
  }
};
exports.resetPasswordGetController = async (req, res, next) => {
  try {
    let menu = await Menu.find();
    let webModel = await WebModel.findOne();
    var validationToken = jwt.decode(req.params.resetId);

    let control = await Controls.findOne();
    if (!control.forgotPassword) {
      return res.redirect("/");
    }

    if (!validationToken) {
      res.redirect("/");
      return false;
    }
    res.render("pages/administrator/resetPassword.ejs", {
      title: "Reset Password",
      style: "bg-light",
      error: {},
      menu,
      webModel,
      flashMessage: {},
      url: req.originalURL,
      loginURI: "/auth/login",
    });
  } catch (e) {
    next(e);
  }
};
exports.resetPasswordPostController = async (req, res, next) => {
  try {
    let menu = await Menu.find();
    let webModel = await WebModel.findOne();
    let error = validationResult(req).formatWith((err) => err.msg);

    let control = await Controls.findOne();
    if (!control.forgotPassword) {
      return res.redirect("/");
    }

    var validationToken = jwt.decode(req.params.resetId);
    if (!validationToken) {
      res.redirect("/");
      return false;
    }

    if (!error.isEmpty()) {
      req.flash("fail", "Invalid Creadentials");
      return res.render("pages/administrator/resetPassword.ejs", {
        title: "Reset Password",
        style: "bg-light",
        error: error.mapped(),
        menu,
        webModel,
        flashMessage: req.flash(),
        url: req.originalURL,
        loginURI: "/auth/login",
      });
    }

    let { password } = req.body;
    let token = req.params.resetId;
    jwt.verify(token, "minhajislam", async (err, info) => {
      if (err) {
        req.flash(
          "fail",
          "Reset password token has expired,Please try to new request"
        );
        return res.redirect("back");
      }
      if (info) {
        let { email, id } = info;
        let admin = await Admin.findOne({ _id: id, email: email });
        if (!admin) {
          req.flash("fail", "Admin is not founded");
          return res.redirect("back");
        }
        let hashedPassword = await bcrypt.hash(password, 11);
        let updatedPassword = await Admin.findOneAndUpdate(
          { _id: id, email: email },
          {
            password: hashedPassword,
          }
        );
        if (!updatedPassword) {
          req.flash("fail", "Internal Server Error");
          return res.redirect("back");
        }
        req.flash("success", "Successfully Updated Password.Please Login Now");
        res.redirect("/auth/login");
      }
    });
  } catch (e) {
    next(e);
  }
};
