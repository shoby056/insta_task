const fs = require("fs");
const path = require("path");

// users.json ka complete path
const filePath = path.join(__dirname, "../data/users.json");

// Saare users read karna
const getUsers = () => {
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
};

// Saare users save karna
const saveUsers = (users) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );
};

// New user create karna
const createUser = (user) => {
  const users = getUsers();

  users.push(user);

  saveUsers(users);

  return user;
};

// Username ya email se user find karna
const findUser = (emailOrMobile, username) => {
  const users = getUsers();

  return users.find(
    (user) =>
      user.emailOrMobile === emailOrMobile ||
      user.username === username
  );
};

module.exports = {
  getUsers,
  saveUsers,
  createUser,
  findUser
};