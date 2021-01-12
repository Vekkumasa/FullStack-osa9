import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField"
import { HospitalEntry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [ { diagnosis } ] = useStateValue();
    return (
        <Formik
        initialValues={{
            type: "Hospital",
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

export default AddEntryForm;