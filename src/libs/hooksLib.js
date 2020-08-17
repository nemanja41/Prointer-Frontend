import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  const handleFieldChange = function (event) {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  };

  return [fields, handleFieldChange];
}
