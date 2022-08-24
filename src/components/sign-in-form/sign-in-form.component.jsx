import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createUserDocumentFromAuth, signInWithGooglePopup, signAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  }
  
  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormField({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput required label="Email" type="email" onChange={handleChange} name="email" value={email}/>
        <FormInput required label="Password" type="password" onChange={handleChange} name="password" value={password}/>
        <div className="buttons-container">
        <Button type="submit">Sign Up</Button>
        <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;