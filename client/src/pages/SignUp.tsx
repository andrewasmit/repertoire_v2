// External Dependencies
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import React from 'react'

// Local Dependencies
// import Loading from "./shared/Loading"

function SignIn() {

interface Values {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
}

const navigate = useNavigate();
const handleSignInClick = useCallback(()=>{
  navigate('/signin');
}, []);

  return (
    <div>
      <h1>This is the Sign Up page.</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirmation: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field 
            id="username" 
            name="username" 
            placeholder="Username" 
          />

          <label htmlFor="password">Password</label>
          <Field 
            id="password" 
            name="password" 
            placeholder="Password" 
            type= "password"
          />
          
          <label htmlFor="password">Confirm Password</label>
          <Field 
            id="passwordConfirmation" 
            name="passwordConfirmation" 
            placeholder="Confirm Password" 
            type= "password"
          />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="Email Address"
            type="email"
          />

          <button type="submit">Sign Up</button>
        </Form>
      </Formik>

      <button onClick={handleSignInClick}>Already have an account?</button>
    </div>
  )
}

export default SignIn;
