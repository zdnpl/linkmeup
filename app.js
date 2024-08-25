const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Folder untuk file statis seperti gambar

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let users = {};

// Rute untuk menampilkan homepage dengan tombol direct ke halaman create
app.get("/", (req, res) => {
  res.render("homepage");
});

// Rute untuk menampilkan formulir pembuatan profil
app.get("/create", (req, res) => {
  res.render("form", { user: null });
});

// Rute untuk profil pengguna berdasarkan nama pengguna di URL
app.get("/:username", (req, res) => {
  const username = req.params.username;
  if (users[username]) {
    const userData = users[username];
    res.render("profile", { user: userData });
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/create", (req, res) => {
  const { username, name, bio, profilePic, linkNames, linkUrls, fontColor, bgColor, buttonColor } = req.body;

  if (users[username]) {
    return res.send("Username already exists.");
  }

  users[username] = {
    name: name,
    bio: bio,
    profilePic: profilePic || "/images/profile_default.jpg",
    links: linkNames.map((name, index) => ({
      name: name,
      url: "https://" + linkUrls[index],
    })),
    theme: {
      fontColor: fontColor || "#000000",
      bgColor: bgColor || "#57886C",
      buttonColor: buttonColor || "#D2E823",
    },
  };

  res.send(`Your profile is created! You can view it at: <a href="/${username}">http://localhost:3000/${username}</a>`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/check-username", async (req, res) => {
  const { username } = req.query;
  const user = await User.findOne({ username }); // Sesuaikan dengan cara Anda mengakses database
  if (user) {
    return res.json({ exists: true });
  }
  res.json({ exists: false });
});
