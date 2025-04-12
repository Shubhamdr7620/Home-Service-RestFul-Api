const express = require("express")
const app = express()
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

let ServicesData=[{id:uuidv4(),name:"plumber",description:"we do best plumbing work",location:"pune"},{id:uuidv4(),name:"electrician",description:"we do best electrician work",location:"bhor"},{id:uuidv4(),name:"painter",description:"we do best painting work",location:"shirwal"}]

app.get("/services/home",(req,res)=>
{
    res.render("Home.ejs",{ServicesData});
})

app.get("/service/new",(req,res)=>
{
    res.render("NewService.ejs")
})

app.post("/service/new",(req,res)=>
{
    let {name,description,location}=req.body;
    let data={id:uuidv4(),name,description,location}
    ServicesData.push(data);
    res.redirect("/services/home")
})

app.get("/service/:id/edit",(req,res)=>
{
    let{id}=req.params;
    let serv=ServicesData.find((ele)=>{if(id===ele.id){return ele}})
    res.render("Edit.ejs",{serv})

})

app.patch("/service/edit/:id",(req,res)=>
{
    console.log("patch request received")
    let{name,description,location}=req.body;
    let serv=ServicesData.find((ele)=>{if(ele.name===name){return ele}})
     serv.description=description;
    res.redirect("/services/home")
    
})

app.delete("/service/:id",(req,res)=>
{
    let{id}=req.params;
    ServicesData=ServicesData.filter((ele)=>id!=ele.id)
    res.redirect("/services/home")
})

app.listen(8080,()=>
{
    console.log("Server Has Started");
})