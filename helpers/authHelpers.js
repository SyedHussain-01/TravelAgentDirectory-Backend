const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Functions

const getAccessToken = (ss) => {
  const token = jwt.sign(
    { _id: ss._id, name: ss.name, user_type: ss.user_type },
    `${process.env.JWT_TOKEN_KEY}`,
    { expiresIn: "15m" }
  );
  return token;
};

const getRefreshToken = (ss) => {
  const token = jwt.sign(
    { _id: ss._id, name: ss.name, user_type: ss.user_type },
    `${process.env.JWT_REFRESH_TOKEN_KEY}`,
    { expiresIn: "7d" }
  );
  return token;
};

const encrypt = async (pass) => {
  const saltRounds = Number(process.env.HASH_ROUNDS);
  try {
    const hashedPass = await bcrypt.hash(pass, saltRounds);
    return hashedPass;
  } catch (error) {
    console.log("err=> ", error);
  }
};

const decrypt = async (userPass, hashedPass) => {
  try {
    const verify = await bcrypt.compare(userPass, hashedPass);
    return verify;
  } catch (error) {
    console.log("error in verification=> ", error);
  }
};

module.exports = {
  getAccessToken,
  getRefreshToken,
  encrypt,
  decrypt,
};
