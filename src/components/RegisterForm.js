import React from "react";
import { Formik, Form } from "formik";
import { Link, Text, Stack } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import * as Yup from "yup";
import { FormikControl } from "./FormikControl";
import { ButtonPrimary } from "./ButtonPrimary";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "../api/axios";

const styles = {
  input: {
    borderWidth: "1.6px",
    borderColor: "#000",
    focusBorderColor: "#4F00C1",
    size: "sm",
  },
  text: {
    fontSize: "14px",
    mt: "24px",
    textAlign: "center",
  },
  link: {
    color: "#4F00C1",
  },
};
const initialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is a required field."),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "password must contain 1 number (0-9), 1 uppercase letters,1 lowercase letters, 1 non-alpha numeric number, password is 8-16 characters with no space"
    )
    .required("Password is required field."),
  firstName: Yup.string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers.")
    .required("First name is a required field."),
  lastName: Yup.string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers.")
    .required("Last name is a required field."),
});

export const RegisterForm = () => {
  // const { state } = useLocation();
  const histroy = useHistory();

  const onSubmit = async (data = {}, { setErrors }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/users/`, data);

      console.log(response);

      if (response.status === 201) {
        console.log("response.data.token", response.data);
        histroy.push("/login");
      }
    } catch (error) {
      if (error.response) {
        // console.error("Register error.response", error.response);
        if (error.response.status === 409) {
          setErrors({ email: "Email is invalid or already taken." });
        }
      }
      console.error("Register error", error);

      // alert(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormLabel as="legend" fontSize="22px" mb="28px">
          Create your naya account
        </FormLabel>
        <Stack spacing={10}>
          <FormikControl
            control="input"
            name="email"
            label="Email"
            type="email"
            placeholder="jon@email.com"
            {...styles.input}
          />

          <FormikControl
            control="input"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••••••"
            {...styles.input}
          />
          <Stack direction="row" spacing={4}>
            <FormikControl
              control="input"
              name="firstName"
              label="First name"
              type="text"
              placeholder="Jon"
              {...styles.input}
            />
            <FormikControl
              control="input"
              name="lastName"
              label="Last name"
              type="text"
              placeholder="Smith"
              {...styles.input}
            />
          </Stack>
          <ButtonPrimary name="Sign up" />
        </Stack>
        <Text fontSize="14px" mt="24px" textAlign="center">
          Already have an account? &nbsp;
          <Link color="#4F00C1" as={RouterLink} to="/login">
            Login here
          </Link>
        </Text>
      </Form>
    </Formik>
  );
};
