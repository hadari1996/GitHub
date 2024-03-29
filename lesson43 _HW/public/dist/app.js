var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
console.log("connected");
getUsers();
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var data, users, successs, div_users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("/api/v1/users")];
                case 1:
                    data = (_a.sent()).data;
                    users = data.users, successs = data.successs;
                    div_users = document.querySelector(".div_users");
                    displayUsers(users, div_users);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var handleGetUsers = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var userid, data, user, successs, users, div_users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                event.preventDefault();
                userid = event.target.elements.userid.value;
                return [4 /*yield*/, axios.get("/api/v1/users/" + userid)];
            case 1:
                data = (_a.sent()).data;
                user = data.user, successs = data.successs;
                users = [];
                users[0] = user;
                document.querySelector(".allUsers").innerHTML = "";
                div_users = document.querySelector(".allUsers");
                displayUsers(users, div_users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
function handleAddUseres(event) {
    return __awaiter(this, void 0, void 0, function () {
        var fName, lName, age, address, data, users, UpdateUsers, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    fName = event.target.elements.fname.value;
                    lName = event.target.elements.lname.value;
                    age = event.target.elements.age.value;
                    address = event.target.elements.address.value;
                    return [4 /*yield*/, axios.post("/api/v1/users", { fName: fName, lName: lName, age: age, address: address })];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    ;
                    users = data.users;
                    UpdateUsers = document.querySelector(".UpdateUsers");
                    displayUsers(users, UpdateUsers);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleDeleteUseres(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data, userArray, UpdateUsers, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    id = event.target.elements.del.value;
                    return [4 /*yield*/, axios["delete"]("/api/v1/users/" + id)];
                case 1:
                    data = (_a.sent()).data;
                    console.log(data);
                    userArray = data.userArray;
                    UpdateUsers = document.querySelector(".deleteUsers");
                    displayUsers(userArray, UpdateUsers);
                    // const input =document.querySelector("#del") ;
                    event.target.elements.del.value = "";
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displayUsers(users, UpdateUsers) {
    UpdateUsers.innerHTML = "";
    var table = document.createElement("table");
    var tHeader = document.createElement("th");
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    td1.textContent = "First name";
    td2.textContent = "Last name";
    td3.textContent = "Age";
    td4.textContent = "Address";
    tHeader.appendChild(td1);
    tHeader.appendChild(td2);
    tHeader.appendChild(td3);
    tHeader.appendChild(td4);
    table.appendChild(tHeader);
    for (var i = 0; i < users.length; i++) {
        var tr = document.createElement('tr');
        var td1_1 = document.createElement('td');
        td1_1.textContent = users[i].f_name;
        var td2_1 = document.createElement('td');
        td2_1.textContent = users[i].l_name;
        var td3_1 = document.createElement('td');
        td3_1.textContent = users[i].age;
        var td4_1 = document.createElement('td');
        td4_1.textContent = users[i].address;
        tr.appendChild(td1_1);
        tr.appendChild(td2_1);
        tr.appendChild(td3_1);
        tr.appendChild(td4_1);
        table.appendChild(tr);
    }
    UpdateUsers.appendChild(table);
}
