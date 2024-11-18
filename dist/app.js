"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const database_1 = __importDefault(require("./utils/database"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(auth_1.default);
database_1.default
    .authenticate()
    .then((response) => console.log('db connection success'))
    .catch((error) => console.log('db connection failed'));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
