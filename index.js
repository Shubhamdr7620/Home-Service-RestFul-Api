const express = require("express")
const app = express()
const path = require("path")

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))

let ServicesData=[{name:"plumber",description:"we do best plumbing work",location:"pune"},{name:"electrician",description:"we do best electrician work",location:"bhor"},{name:"painter",description:"we do best painting work",location:"shirwal"}]

app.get("/services",(req,res)=>
{
    res.render("Home.ejs",{ServicesData});
})

app.get("/service",(req,res)=>
{
    res.render("NewService.ejs")
})

app.post("/services",(req,res)=>
{
    let details=req.body;
    ServicesData.push(details);
    res.redirect("/services")
    
})

app.listen(8080,()=>
{
    console.log("Server Has Started");
})