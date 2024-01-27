"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
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
exports.app.listen(port, () => {
    console.log(`App listening port ${port}`);
});
