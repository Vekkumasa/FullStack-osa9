import React, { useState } from "react";
import axios from "axios";
import HealthIcon  from "../components/HealthRatingBar";
import { Container, Icon, Segment } from "semantic-ui-react";
import { Patient, icon, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { useParams } from "react-router-dom";

interface id {
    id: string;
}

const SinglePatient: React.FC = () => {
    const [ {patient}, dispatch] = useStateValue();
    const [ { diagnosis } ] = useStateValue();
    const id = useParams<id>();

    const getPatient = async () => {
        try {
            const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`);
            dispatch(setPatient(patient));
        } catch (e) {
            console.log(e);
        }  
    };

    const HospitalEntrySegment: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
        return(
            <Segment color="red" textAlign="left">
                <h3> {entry.date} <Icon name="hospital" /></h3>
                <p> {entry.description} </p>
                <p> {entry.discharge.date}: {entry.discharge.criteria }</p>
            </Segment>
        )
    }

    const OccupationalHealthCareSegment: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
        return(
            <Segment color="teal" textAlign="left">
                <h3> {entry.date} <Icon name="stethoscope" /> {entry.employerName}</h3>
                <p> {entry.description} </p>
                <div> {entry.sickLeave? <p>Sickleave: {entry.sickLeave.startDate}-{entry.sickLeave.endDate}</p> :
                <p> Didn't require sickleave</p>} </div>
            </Segment>
        )
    }
    
    const HealthCheckSegment: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
        return(
            <Segment color="purple" textAlign="left">
                <h3> {entry.date} <Icon name="heartbeat" /></h3>
                <p> {entry.description} </p>
                <HealthIcon rating={entry.healthCheckRating} showText={true}/>
            </Segment>
        )
    }

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    if (!patient || patient.id !== id.id) {
        getPatient();    
    }

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntrySegment entry={entry} />
            
            case "OccupationalHealthcare":
                return <OccupationalHealthCareSegment entry={entry} />

            case "HealthCheck":
                return <HealthCheckSegment entry={entry} />

            default:
                return assertNever(entry);
        }
    }

    if (patient) {
        return (
            <div className="App">
              <Container textAlign="left">
                <h3>{patient.name} <Icon name={icon[patient.gender]} /></h3>
                <p> ssn: {patient.ssn}</p>
                <p> Occupation: {patient.occupation}</p>
                <br/>
                <h3>Entries:</h3>
                <div>{patient.entries.map((e, i) => (
                   <EntryDetails key={i} entry={e} />
                ))}            
                </div>
              </Container>
            </div>
        )
    } else {
        return (
            <div className="App">
                <Container textAlign="left">
                    <h3> Patient not defined </h3>
                </Container>
            </div>
        )
    }
    
}

export default SinglePatient;