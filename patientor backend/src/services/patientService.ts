import patientData from '../../data/patients'
import { publicPatient, Patient, noSSN, noId, noIdOccupationalHealthCareEntry, noIdHospitalEntry, noIdHealthCheckEntry, Entry } from '../types' 
import { v4 as uuidv4 } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getOne = (patient: string): publicPatient | undefined => {
    return patients.find(p => p.id === patient);
} 

const addPatient = ( entry: noId ): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
}

const getNoSsnEntries = (): noSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addEntry = (patientId: Patient['id'], entry: noIdHealthCheckEntry | noIdHospitalEntry | noIdOccupationalHealthCareEntry): Entry | any=> {
    const patient = patients.find(p => p.id === patientId);
    const newEntry = {
        ...entry,
        id: uuidv4()
    };
    patient?.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    addEntry,
    getNoSsnEntries,
    addPatient,
    getOne
};