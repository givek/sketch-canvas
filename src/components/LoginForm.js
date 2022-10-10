import React from "react";
import { Formik, Form } from "formik";
import { Link, Text, Stack } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import * as Yup from "yup";
import { FormikControl } from "./FormikControl";
import { ButtonPrimary } from "./ButtonPrimary";
import { Link as RouterLink } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

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
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is a required field."),
  password: Yup.string().required("Password is required field."),
});

export const LoginForm = () => {
  // const { state } = useLocation();
  // const { login } = useAuth();
  const histroy = useHistory();

  const { auth, setAuth } = useAuth();

  const onSubmit = async (data = {}, { setErrors }) => {
    try {
      console.log(data);
      const response = await axios.post(`/api/session/`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        // dispatchToken({ type: SET_TOKEN, token: response.data.token });
        console.log(response.data);
        setAuth((prev) => ({
          ...prev,
          accessToken: response.data.accessToken,
        }));
        console.log("Auth", auth);
        histroy.push("/sketches");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
        console.log(error.response);
      }
      alert(error);
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
          Login to continue
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

          <ButtonPrimary name="Login" />
        </Stack>
        <Text {...styles.text}>
          <Link to="/login" as={RouterLink} {...styles.link}>
            Forgot password?
          </Link>
        </Text>
        <Text {...styles.text}>
          Don't have a fehler account? &nbsp;
          <Link to="/register" as={RouterLink} {...styles.link}>
            Create one
          </Link>
        </Text>
      </Form>
    </Formik>
  );
};