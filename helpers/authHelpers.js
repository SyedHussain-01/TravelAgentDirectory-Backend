const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendResponse = require("./sharedHelpers");

//Functions

const getAccessToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.name, user_type:ss.user_type },
    `${process.env.JWT_TOKEN_KEY}`,
    { expiresIn: "15m" }
  );
  return token;
};

const getRefreshToken = (ss) => {
  const token = jwt.sign(
    { id: ss._id, name: ss.name, user_type:ss.user_type },
    `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    { expiresIn: "7d" }
  );
  return token;
};


const encryptPassword = async (pass) => {
  const saltRounds = process.env.HASH_ROUNDS
  try {
    const hashedPass = await bcrypt.hash(pass, saltRounds)
    return hashedPass;
  } catch (error) {
    console.log("err=> ", error)
  }
}

const decryptPassword = async (userPass, hashedPass) => {
  try {
    const verify = await bcrypt.compare(userPass, hashedPass)
    return verify; 
  } catch (error) {
    console.log("error in verification=> ", error)
  }
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  encryptPassword,
  decryptPassword
};
