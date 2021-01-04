import { noId, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Invalid gender` + gender);
    }
    return gender;
}
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name ` + name);
    }
    return name;
}

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect ssn` + ssn);
    }
    return ssn;
}

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect date` + date);
    }
    return date;
}

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect occupation` + occupation);
    }
    return occupation;
}

const toNewPatientEntry = (object: any): noId => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender)
    };
  };

export default toNewPatientEntry;