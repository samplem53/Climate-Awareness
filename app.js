const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const axios = require('axios');
const { response } = require('express');
const port = process.env.PORT||8080;
app.use(bodyParser.urlencoded({ extended: false }));

// To Use CSS
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

// Testing Endpoint
const url = "https://global-warming.org/api/temperature-api";
const methane_url = "https://global-warming.org/api/methane-api";
const poalr_url = "https://global-warming.org/api/arctic-api";

app.get("/tmp",(req,res)=>{
    let labless = [];
    let valuess = [];
    axios.get(url)
        .then(response=>{
            let out = response.data.result;
            out.forEach((ot)=>{
                labless.push(Number(ot.time));
                valuess.push(Number(ot.station));
            })
            // console.log(labless);
            // console.log("This is valuess ");
            // console.log(valuess);
            res.render("home",{
                val:valuess,
                lab:labless
            })
        })
        .catch(error=>{
            console.log(error);
        });
});

// Route for Methane Emission
app.get("/methane",(req,res)=>{
    let methane_labels = [];
    let methane_values = [];
    axios.get(methane_url)
        .then(response=>{
            let output = response.data.methane;
            output.forEach((opt)=>{
                methane_labels.push(Number(opt.date));
                methane_values.push(Number(opt.average));
            })
            res.render("methane",{
                val:methane_values,
                lab:methane_labels
            })
        })
        .catch(error=>{
            console.log(error);
        })
});

// Route for Polar Caps
app.get("/polar",(req,res)=>{
    let pol_lab = [];
    let pol_val = [];
    axios.get(poalr_url)
        .then(response=>{
            let polar_result =response.data.result;
            polar_result.forEach((pol)=>{
                pol_lab.push(Number(pol.year));
                pol_val.push(Number(pol.area));
            })
            res.render("polar",{
                val:pol_val,
                lab:pol_lab
            })
        })
        .catch(error=>{
            console.log(error);
        })
})
app.listen(port,()=>{
    console.log("App is running!!");
})