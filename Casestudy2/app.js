// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose=require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const EmployeeModel=require('../Casestudy2/model/EMPdata');

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongourl=process.env.MONGO_URL
const dbname=process.env.DB_NAME

mongoose.connect(`${mongourl}/${dbname}`).then(()=>{
    console.log(`Connected to MongoDB ${mongourl}/${dbname}`)
})
.catch(err => console.log(err));

//TODO: get data from db using api 'api/employeelist


app.get('/api/employeelist',async(req,res)=>{
    try {
        const employees=await EmployeeModel.find({});
        res.json(employees);
    } catch (error) {
        console.error('Error!!',error);
        res.status(500).json({error});
    }
})

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('api/employeelist/:id',async(req,res)=>{
   const id=req.params.id
   try {
    const employees=await EmployeeModel.findById(id);
    if(!employees){
        res.status(404).json({error:'Employee not found'});
    }else{
        res.json(employees)
    }
    }
    catch (error) {
     console.error('Error!!',error);
     res.status(500).json({error})
   
    }

})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    const{name,position,location,salary}=req.body;
    try {
        const newEmployee=await EmployeeModel.create({
            name: name,
            position: position,
            locatuin: location,
            salary: salary
        });
        res.status(200).json(newEmployee);
    } catch (error) {
        console.error('Error!!',error);
        res.status(500).json({error})
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id',async(req,res)=>{
    const id=req.params.id
    try {
        const delteEmployee=await EmployeeModel.findOneAndDelete(id);
        if(!deleteEmployee){
            res.status(404).json({error:'Employee not found'})
        }else{
            res.json(deleteEmployee);
        }
    } catch (error) {
        console.error('Error!!',error);
        res.status(500).json({error})
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{
    try {
        const {name,position,location,salary}=req.body;
        const updateObject={};
        if(name) updateObject.name=name;
        if(position) updateObject.position=position;
        if(location) updateObject.location=location;
        if(salary) updateObject.salary=salary;
        const updatedEmployee=await EmployeeModel.finfOneAndUpdate(id);
        if(!updatedEmployee){
            res.status(404).json({error:'Update failed'});
        }else{
            res.json(updatedEmployee);
        }

    } catch (error) {
        console.error('Error!!',error);
        res.status(500).json({error});
    }
})





//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



