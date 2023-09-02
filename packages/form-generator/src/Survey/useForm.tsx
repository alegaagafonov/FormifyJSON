import { useState, useRef } from "react";

interface Api {
  saveFeedback: (params: {
    projectId: string;
    data: FormData;
  }) => Promise<Response>;
}

const useForm = (initialValues: Record<string, any>, api: Api) => {
  const [values, setValues] = useState(initialValues);
  const [errors] = useState({});
  const formData = useRef(new FormData());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      formData.current.append(name, file);
    }
  };

  const handleSubmit = async (projectId: string) => {
    for (const key in values) {
      if (values[key] instanceof File) {
        // Skip files as they are already in formData
        continue;
      }
      formData.current.append(key, values[key]);
    }

    try {
      const response = await api.saveFeedback({
        projectId,
        data: formData.current,
      });
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
    handleFileChange,
    handleSubmit,
  };
};

export default useForm;
