"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotAuthenticated = exports.checkAuthenticated = exports.createComment = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const passport_config_1 = __importDefault(require("./config/passport-config"));
const method_override_1 = __importDefault(require("method-override"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = __importDefault(require("./routes/routes"));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
exports.app = (0, express_1.default)();
const port = 3000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/routes.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
(0, passport_config_1.default)(passport_1.default, (email) => db_1.USERS.find((user) => user.email === email), (id) => db_1.USERS.find((user) => user.id === id));
exports.app.use(express_1.default.json());
exports.app.use((0, express_flash_1.default)());
exports.app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.set("view engine", "ejs");
exports.app.set("views", path_1.default.join(__dirname, "src/views"));
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, method_override_1.default)("_method"));
exports.app.use("/", routes_1.default);
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
/* export const createUser = (user: PartialUsersType): User => {
  const userId: string = v4();
  const newUser:User = {
    id: userId,
    ...user,
  };
  USERS.push(newUser);
  return newUser;
}; */
const createComment = (comment) => {
    db_1.COMMENTS.push(comment);
};
exports.createComment = createComment;
exports.app.get("/", checkAuthenticated, (req, res) => {
    if (req.user) {
        const { name } = req.user;
        res.render("index.ejs", { name });
    }
    else {
        res.redirect("/login");
    }
});
exports.app.get("/login", checkNotAuthenticated, (req, res) => {
    console.log("Flash messages:", req.flash("error"));
    res.render("login", { messages: req.flash("error") });
});
exports.app.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
}));
exports.app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});
exports.app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        db_1.USERS.push({
            id: (0, uuid_1.v4)(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect("/login");
    }
    catch (_a) {
        res.redirect("/register");
    }
}));
exports.app.delete("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});
exports.app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
exports.checkAuthenticated = checkAuthenticated;
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return next();
}
exports.checkNotAuthenticated = checkNotAuthenticated;
