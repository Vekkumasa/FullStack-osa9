import express from 'express';
import { calculateBmi, parseArguments } from "./bmiCalculator";
import { parseAndCalculate } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const data: any = req.body;
  const treenit: any = data.daily_exercises;
  treenit.unshift(data.target);
  if (data.daily_exercises == undefined || data.target == undefined) {
    const error = {
      error: "Parameters missing"
    };
    res.json(error);
  }
  try {
    const olio = parseAndCalculate(treenit);
    res.json(olio);
  } catch (e) {
    const error = {
      error: "Malformatted data"
    };
    res.json(error);
  } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});