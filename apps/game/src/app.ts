import express from 'express';
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static("surfers"));
app.set("view engine", "ejs");
app.set("trust proxy", true);

app.use((req, res, next) => {
      // res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      console.log(req.method, req.url, req.ip);
      next()
    })



app.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});
