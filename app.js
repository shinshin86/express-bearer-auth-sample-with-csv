const express = require("express");
const app = express();
const fs = require("fs/promises");
const { parse } = require("csv-parse/sync");

// constants
const USER_CSV_PATH = "./user.csv";
const PORT = 3000;

const getUser = async (token) => {
  const file = await fs.readFile(USER_CSV_PATH);
  const data = parse(file, { columns: true });
  const matchedData = data.filter((d) => d.token === token);

  if (matchedData.length === 0) {
    return;
  }

  if (matchedData.length !== 1) {
    throw new Error("Dublicate token!!");
  }

  return matchedData[0];
};

app.get("/", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bearerToken = authorization.split(" ")[1];

  try {
    const user = await getUser(bearerToken);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ reponse: { user } });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
