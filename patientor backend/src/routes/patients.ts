import express from 'express';
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnEntries());
});

router.get('/:id', (req, res) => {
    res.send(patientService.getOne(req.params.id));
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

export default router