const express =require ("express")
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "5afe8ed6a4def124dff8e0a8c7de5d8c";


    app.get("/weather", async (req, res) => {

    const city = req.query.city;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    console.log(data);

    res.json(data);

});


app.listen(5000, () => {

    console.log("Server Running on Port 5000");

});