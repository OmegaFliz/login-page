const express = require("express");
const app = express();
const cors = require('cors')
const userRoute = require('./routes/user-route')

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const PORT = 8080;

const db = require("./models");
db.sequelize.sync();


// require('./routes/user-route')(app)

app.use(express.json());

app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
