import patientData from '../../data/patients.json'
import { Patient, noSSN, noId } from '../types'
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
    return patients;
};

const addPatient = ( entry: noId ): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
}

const getNoSsnEntries = (): noSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
    getNoSsnEntries,
    addPatient
};