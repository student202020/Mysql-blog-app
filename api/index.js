import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import cors from "cors";
import multer from "multer"



const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));



app.get("/", (req, res)=>{
    res.json("hello from browser!");
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });


app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(7000, ()=>{console.log("Conected!")})