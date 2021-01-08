export interface Diagnose {
    code: string,
    name: string,
    latin?: string
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
  }

  interface Discharge {
      date: string,
      criteria: string
  }

  export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge?: Discharge
  }

  interface sickLeave {
      startDate: string,
      endDate: string
  }
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: sickLeave
  }

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
};

export type publicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type noSSN = Omit<Patient, 'ssn'>;

export type noId = Omit<Patient, 'id'>;

export type noIdOccupationalHealthCareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type noIdHospitalEntry = Omit<HospitalEntry, 'id'>;
export type noIdHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type noIdBaseEntry = Omit<BaseEntry, 'id'>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;