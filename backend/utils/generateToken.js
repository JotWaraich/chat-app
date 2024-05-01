import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    naxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevent XSS attack
    sameSite: "strict", // prevent CSRF attack
    secure: process.env.NODE_ENV !== "development", // cookie only works in https
  });
};

export default generateToken;
