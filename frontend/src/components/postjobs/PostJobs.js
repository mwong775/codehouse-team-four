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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  let job_lists = []
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
  form_values['jobtype'] = job_lists
  console.log(form_values)
  axios.post('http://localhost:5001/jobs', form_values) // `${process.env.REACT_APP_HOST_IP_ADDRESS}/jobs`
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
};

const validate = values => {
  const errors = {};
  if (!values.company) {
    errors.company = 'Required';
  }
  return errors;
};

export function PostJobs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        <span role="img" aria-label="jsx-a11y/accessible-emoji">🏁</span> Add Job Listing
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="company"
                    component={TextField}
                    type="text"
                    label="Company"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="location"
                    component={TextField}
                    multiline
                    label="Job Location"
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
                    name="jobdesc"
                    fullWidth
                    required
                    component={TextField}
                    type="text"
                    label="Job Description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="joblink"
                    fullWidth
                    component={TextField}
                    type="text"
                    label="Job link"
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
                    onClick={handleClickOpen}
                  >
                    Submit
                  </Button>
                  <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                      <h1>Posted Successfully!</h1>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </Paper>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}