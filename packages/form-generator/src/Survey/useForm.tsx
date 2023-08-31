// useForm.js
import { useState } from "react";
import { saveFeedback } from "./api";

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors] = useState({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (projectId: string) => {
    try {
      // @ts-ignore
      const response = await saveFeedback(projectId, values);
      if (!response.ok) {
        // handle error
      }
      // handle success
    } catch (error) {
      // handle network error
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
