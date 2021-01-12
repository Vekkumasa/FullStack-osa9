import { noId, Gender, Entry, HealthCheckRating, noIdOccupationalHealthCareEntry, noIdHospitalEntry, noIdHealthCheckEntry, noIdBaseEntry} from './types';

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

const parseEntries = (entries: any): Entry[] => {
    console.log(entries);
    return [];
}

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description ` + description);
    }
    return description;
}

const parseDate = (date: any): string => {
    if (!date || !isString(date)) {
        throw new Error(`Incorrect or missing date ` + date);
    }
    return date;
}

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist ` + specialist);
    }
    return specialist;
}

const parseCriteria = (criteria: any): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error(`Incorrect or missing criteria ` + criteria);
    }
    return criteria;
}

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        console.log(healthCheckRating)
        throw new Error(`Incorrect or missing healthCheckRating ` + healthCheckRating);
    }
    return healthCheckRating;
}

export const toNewPatientEntry = (object: any): noId => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: parseEntries(object.entries)
    };
};

const parseEmployerName = (employer:any): string => {
    if (!employer || isString(employer)) {
        throw new Error(`Incorrect or missing employer ` + employer);
    }
    return employer;
}

const parseBase = (object: any): noIdBaseEntry => {
    return {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes
    }
}

const parseHospital = (object: any): noIdHospitalEntry => {
    const entry = parseBase(object);
    const newHospitalEntry = {
        ...entry,
        type: object.type
    }
    if (object.discharge.date !== '' || object.discharge.criteria !== '') {
        console.log(object);
        return {...newHospitalEntry, discharge: {date: parseDate(object.discharge.date), criteria: parseCriteria(object.discharge.criteria)}};
    }
    return newHospitalEntry;
}

const parseOccupationalHealthCare = (object: any): noIdOccupationalHealthCareEntry => {
    const entry = parseBase(object);
    const newOccupationalHealthCareEntry = {
        ...entry,
        employerName: parseEmployerName(object.employerName),
        type: object.type
    }
    if (object.sickLeave) {
        return {...newOccupationalHealthCareEntry, sickLeave: {startDate: parseDate(object.sickLeave.startDate), endDate: parseDate(object.sickLeave.endDate)}}
    }
    return newOccupationalHealthCareEntry;
}

const parseHealthCheck = (object:any): noIdHealthCheckEntry => {
    const entry = parseBase(object);
    const newHealthCheckEntry = {
        ...entry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    }
    return newHealthCheckEntry;
}

export const newEntry = (object: any): noIdHospitalEntry | noIdHealthCheckEntry | noIdOccupationalHealthCareEntry => {
    switch (object.type) {
        case "Hospital":
            return parseHospital(object);
        case "OccupationalHealthcare":
            return parseOccupationalHealthCare(object);
        case "HealthCheck":
            return parseHealthCheck(object);
        default:
            return parseHospital(object);
    }
}
