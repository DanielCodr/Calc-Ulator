import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://newton.now.sh/api/v2";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render("index.ejs", {response: "Waiting for data..."});
})

app.post("/simplify", async (req, res) => {
    const ex = encodeURIComponent(req.body.expression);
    
    try {
      const result = await axios.get(API_URL + "/simplify/" + ex);
      res.render("index.ejs", { response: result.data.result });
    } catch (error) {
      res.render("index.ejs", { response: "Error"  });
      console.log(error.response.data);
    }
  });

app.post("/factor", async (req,res)=>{
    const ex = encodeURIComponent(req.body.expression);
    //console.warn('testing ', encodeURIComponent(ex));
    
    try {
        const result = await axios.get(API_URL + "/factor/"+ex);
        res.render("index.ejs", { response: result.data.result});
        
    } catch (error) {
        res.render("index.ejs", { response: "Error" });
        console.log(error.response.data);
    }
});

app.post("/derive", async (req,res)=>{
    const ex = encodeURIComponent(req.body.expression);
    
    try {
        const result = await axios.get(API_URL + "/derive/"+ex);
        res.render("index.ejs", {response: result.data.result});
        
    } catch (error) {
        res.render("index.ejs", {esponse: "Error" });
        console.log(error.response.data);
    }
});

app.post("/integrate", async (req,res)=>{
    const ex = encodeURIComponent(req.body.expression);
    
    try {
        const result = await axios.get(API_URL + "/integrate/"+ex);
        res.render("index.ejs", {response: result.data.result});
    } catch (error) {
        res.render("index.ejs", {response: "Error" });
        console.log(error.response.data);
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });