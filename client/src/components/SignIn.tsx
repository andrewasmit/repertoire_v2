// External Dependencies
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import React from 'react'

// Internal Dependencies


// Local Dependencies
// import Loading from "./shared/Loading"

function SignIn() {

interface Values {
  username: string;
  password: string;
}

const navigate = useNavigate();
const handleSignUpClick = useCallback(()=>{
  navigate('/signup');
}, []);

  return (
    <div>
      <h1>This is the Sign In page.</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
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
          {/* <label htmlFor="username">Username</label> */}
          <Field 
            id="username" 
            name="username" 
            placeholder="Username" 
          />

          {/* <label htmlFor="password">Password</label> */}
          <Field 
            id="password" 
            name="password" 
            placeholder="Password" 
            type= "password"
          />

          <button type="submit">Sign In</button>

        </Form>
      </Formik>

      <button onClick={handleSignUpClick}>Don't have an account yet?</button>
    </div>
  )
}

export default SignIn;
