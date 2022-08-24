import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword){
      alert("password doesnt match");
      return;
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch(error) {
      if (error.code === "auth/email-already-in-use"){
      alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encounterd an error", error);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormField({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>Doesn't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput required label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName}/>
        
        <FormInput required label="Email" type="email" onChange={handleChange} name="email" value={email}/>

        <FormInput required label="Password" type="password" onChange={handleChange} name="password" value={password}/>

        <FormInput required label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;