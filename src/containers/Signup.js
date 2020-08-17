import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { apiPostRequest } from "../libs/api";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const { userHasAuthenticated, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      userHasAuthenticated(true);

      const json = await apiPostRequest("/signup", fields);
      if (!json.user) {
        throw Error(json.message);
      }
      setUser(json.user);
      setIsLoading(false);
      userHasAuthenticated(true);

      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName" bsSize="large">
          <ControlLabel>First name</ControlLabel>
          <FormControl
            autoFocus
            value={fields.firstName}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl value={fields.lastName} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="phoneNumber" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            value={fields.phoneNumber}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    </div>
  );
}
