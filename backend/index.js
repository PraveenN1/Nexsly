const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const postRoutes=require("./routes/postRoutes");
const userRoutes=require("./routes/userRoutes");
const tagsRoutes=require("./routes/tagsRoutes");

const app=express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ["GET", "PUT", "PATCH", "DELETE"],
    })
);


mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>console.error("DB Error",err));

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/post',postRoutes);
app.use('/tags',tagsRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to AdviceHub");
})

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
})