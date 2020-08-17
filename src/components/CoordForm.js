import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";

const CoordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { multiPolyline, setMultiPolyline } = useAppContext();

  const [fields, handleFieldChange] = useFormFields({
    lang: "",
    lat: "",
  });

  const validateForm = () => {
    return fields.lang.length > 0 && fields.lat.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMultiPolyline([
      ...multiPolyline,
      [Number(fields.lang), Number(fields.lat)],
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup controlId="lang" bsSize="small">
        <ControlLabel>Longtitude</ControlLabel>
        <FormControl
          autoFocus
          value={fields.lang}
          onChange={handleFieldChange}
        />
      </FormGroup>
      <FormGroup controlId="lat" bsSize="small">
        <ControlLabel>Latitude</ControlLabel>
        <FormControl
          value={fields.lat}
          //TODO uradi kao u pravoj ako neces ovo da popravljas
          onChange={handleFieldChange}
        />
      </FormGroup>
      <LoaderButton block variant="primary" type="submit" isLoading={isLoading}>
        Add point
      </LoaderButton>
    </form>
  );
};

export default CoordForm;
