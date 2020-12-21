import express from 'express';
import { calculateBmi, parseArguments } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  
  if (req.query.pituus == undefined || req.query.paino == undefined) {
    const error = {
      error: "malformatted input"
    };
    res.json(error);
  } else {
    const lista: Array<any> = ['q', 'x', req.query.pituus, req.query.paino];
    const bmi = parseArguments(lista);
    const indeksi = calculateBmi(bmi.pituus, bmi.paino);
    const palautettava = {
      pituus: bmi.pituus,
      paino: bmi.paino,
      bmi: indeksi
    };
    res.json(palautettava);
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});