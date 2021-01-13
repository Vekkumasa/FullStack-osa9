import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField"
import { HospitalEntry, Entry, HealthCheckRating } from "../types";
import { DiagnosisSelection, HealthCheckSelectField, HealthCheckOption, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: unknown) => void;
    onCancel: () => void;
    type: Entry['type'];
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk"}
];

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
    const [ { diagnosis } ] = useStateValue();
    return (
        <Formik
        initialValues={{
            type,
            description: "",
            specialist: "",
            date: "",
            diagnosisCodes: [],
            discharge: {
                date: "", 
                criteria: ""},
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string} = {};
            if (!values.description) {
                errors.description = requiredError;
              }
              if (!values.specialist) {
                errors.specialist = requiredError;
              }
              if (!values.date) {
                errors.date = requiredError;
              }
              return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Discharge date:"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria:"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection setFieldTouched={setFieldTouched} setFieldValue={setFieldValue} diagnoses={Object.values(diagnosis)} />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
        </Formik>
    )
}  

export const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik initialValues={{
      type,
      description: '',
      specialist: '',
      date: '',
      diagnosisCodes: [],
      healthCheckRating: HealthCheckRating.Healthy
    }} 
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      return errors;
    }}
    >
      {({ isValid, dirty}) => {
        return (
          <Form className="form ui">
              <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <HealthCheckSelectField
            label="Health rating"
            name="healthCheckRating"
            options={healthCheckOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export const OccupationalCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik initialValues={{
      type,
      description: '',
      specialist: '',
      date: '',
      diagnosisCodes: [],
      employerName: '',
      sickLeave: {
        startDate: '',
        endDate: ''
      }
    }} 
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
      return errors;
    }}
    >
      {({ isValid, dirty}) => {
        return (
          <Form className="form ui">
              <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field 
              label="Employer Name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}
export default HospitalEntryForm;