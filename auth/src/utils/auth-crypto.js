const {promisify}=require("util");
const { randomBytes, pbkdf2 } = require("crypto");
const randomBytesAsync=promisify(randomBytes);
const pbkdf2Async=promisify(pbkdf2);

//hash the password
const hashPassword =async(password) => {
  const salt = await randomBytesAsync(16);
  const hash = await pbkdf2Async(password, salt, 1000, 64, "sha512");
  return `${hash}:${salt}`;
};

// compare the password
const verifyPassword = async(givenPassword, storedPassword) => {
  const [storedHashed, storedSalt] = storedPassword.split(":");
  const hash = await pbkdf2Async(
    givenPassword,
    storedSalt,
    1000,
    64,
    "sha512"
  );
  return storedHashed === hash;
};

// check the password at the updating time
const hasPasswordChanged=(givenPassword,storedPassword)=>{
    return givenPassword!==storedPassword;
}

module.exports = { hashPassword, verifyPassword,hasPasswordChanged };
