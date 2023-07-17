const express = require('express');
const bodyParser = require('body-parser');
const mysql = require ('mysql2');


let fakeDataBase = [
    { id:1, name:'Hafsa Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:2, name:'Basma Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:3, name:'Nusaiba Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:4, name:'Amir Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:5, name:'Ammar Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:6, name:'FAtima Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:7, name:'Maryam Yakub', email:'ummuhasnaa90@gmail.com'},
    { id:8, name:'Nihla Yakub', email:'ummuhasnaa90@gmail.com'}
];

const PORT = 5001;

const app = express();

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.post('/api/users',(req, res, next) => {
    const newUser = { id:fakeDataBase.length + 1, ...req.body};
    fakeDataBase.push(newUser);

    res.status(201).json({
        success:true, 
        message:'Creating User was Successful', 
        data:newUser,
})

});
// app.get(`/api/users`,(req,res, next) => {
//     res.status(200).json({success:true, message:'Fetching User was Successful', 
//     data:[{ id:1, name:'Hafsa Yakub', email:'ummuhasnaa90@gmail.com'}] });
// });

app.get(`/api/users`,(req,res, next) => {
    res.status(200).json({
        success:true, 
        message:'Fetching User was Successful', 
        data:fakeDataBase,
 });
});

app.get('/api/users/:id',(req,res, next) => {
    let user ;
    const id = req.params.id;
    const foundUser = fakeDataBase.filter((user) => user.id == Number(id));

    if (foundUser.length > 0){
        user = foundUser[0];
    }
    res.status(200).json({
        success:true, 
        message:'Fetching User was Successful', 
        data:user,
 });
});

// app.post(`/api/users`,(req,res, next) => {
//     res.status(201).json({success:true, message:'Creating User was Successful', 
//     data:[{ id:1, name:'Hafsa Yakub', email:'ummuhasnaa90@gmail.com'}] });
// });

app.put('/api/users/:id',(req,res, next) => {
    let user ;
    const id = req.params.id;
    const foundUser = fakeDataBase.filter((user) => user.id == Number(id));

    if (foundUser.length > 0){
        user = foundUser[0];
        const index = fakeDataBase.indexOf(user);
        if (index != -1){
            fakeDataBase[index] = { ...user, ...req.body};
            user = fakeDataBase[index];
        }
    
    }
    res.status(200).json({
        success:true, 
        message:'User update was Successful', 
        data:user,
 });
});

app.delete('/api/users/:id',(req,res, next) => {
    let user ;
    const id = req.params.id;
    const foundUser = fakeDataBase.filter((user) => user.id == Number(id));

    if (foundUser.length > 0){
        user = foundUser[0];
        const index = fakeDataBase.indexOf(user);
        if (index != -1){
            fakeDataBase = fakeDataBase.filter((user) => user.id != Number(id));
        }
    }
    res.status(200).json({
        success:true, 
        message:'Deleted Successful', 
        data:user,
 });
});


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)}

);