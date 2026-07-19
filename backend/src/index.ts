import express from "express";

const app = express();
const PORT = 3000;

app.get('/health',(_req,res)=>{
    res.send('OK')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})