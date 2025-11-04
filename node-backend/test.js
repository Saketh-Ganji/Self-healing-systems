const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/ai/recommend", (req, res) => {
  res.json({ message: "AI route works!", body: req.body });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Test server on http://localhost:${PORT}`));
