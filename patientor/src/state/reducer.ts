import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
  }

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: payload
  };
}

export const setPatient = (payload: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: payload
  };
}

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: payload
  };
}

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: payload
  };
}

export const addEntry = (payload: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: payload,
    id: id
  };
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}), {}
          )
        }
      };
      
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    
    case "ADD_ENTRY": 
      if (state.patient) {
        return {
          ...state,
          patient: {            
            ...state.patients[action.id],
            entries: [
              ...state.patient.entries, action.payload
            ]
          }
        }
      } else {
        return state;
      }
    default:
      return state;
  }
};
