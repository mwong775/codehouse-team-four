import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  FormControlLabel,
} from '@material-ui/core';
import axios from 'axios'

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  let job_lists = []
  let contact_lists=[]
  let form_values = values
  if (values.hasOwnProperty('fulltime')) {
    if (values['fulltime'] === true) {
      delete form_values['fulltime']
      job_lists.push('fulltime')
    }
  }
  if (values.hasOwnProperty('parttime')) {
    if (values['parttime'] === true) {
      delete form_values['parttime']
      job_lists.push('parttime')
    }
  }
  if (values.hasOwnProperty('shortterm')) {
    if (values['shortterm'] === true) {
      delete form_values['shortterm']
      job_lists.push('shortterm')
    }
  }
  if (values.hasOwnProperty('internship')) {
    if (values['internship'] === true) {
      delete form_values['internship']
      job_lists.push('internship')
    }
  }

  contact_lists.push(values['email'])
  contact_lists.push(values['phoneno'])
  delete form_values['phoneno']
  form_values['jobtype'] = job_lists
  form_values['contactdetails'] = contact_lists
  console.log(form_values)
  axios.post('http://localhost:5003/talent', form_values) // `${process.env.REACT_APP_HOST_IP_ADDRESS}/talent`
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  window.alert(JSON.stringify(form_values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

export function PostTalent() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
      <span role="img" aria-label="jsx-a11y/accessible-emoji">🏁</span> Add Talent
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{  }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="firstName"
                    component={TextField}
                    type="text"
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="lastName"
                    component={TextField}
                    type="text"
                    label="Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    required
                    component={TextField}
                    type="email"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="phoneno"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Phone Number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="location"
                    component={TextField}
                    multiline
                    label="Location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Full-time"
                    control={
                      <Field
                        name="fulltime"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                 />
                 <FormControlLabel
                    label="Part-time"
                    control={
                      <Field
                        name="parttime"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                />
                <FormControlLabel
                    label="Short-term"
                    control={
                      <Field
                        name="shortterm"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                />
                <FormControlLabel
                    label="Internship"
                    control={
                      <Field
                        name="internship"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />          
                </Grid>        
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="skills"
                    component={TextField}
                    multiline
                    label="Skills"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="tags"
                    component={TextField}
                    multiline
                    label="Tags"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}