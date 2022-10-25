import { Formik, Form, FormikHelpers } from "formik";
import { Link, Text, Stack } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
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

function LoginForm() {
  // const { state } = useLocation();
  const histroy = useHistory();

  const auth = useAuth();

  const onSubmit = async (
    data = {},
    { setErrors }: FormikHelpers<typeof initialValues>
  ) => {
    try {
      // console.log(data);
      const response = await axios.post(`/api/session/`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        // dispatchToken({ type: SET_TOKEN, token: response.data.token });
        console.log("Setting Auth Token", response.data);
        auth?.setAuth(response.data.accessToken);
        // console.log("Auth", auth);
        histroy.push("/sketches");
      }
    } catch (error: any) {
      if (error.response) {
        // console.error("Login error.response", error.response);
        if (error.response.status === 401) {
          setErrors({ password: "Invalid email or password." });
        }
      }
      // alert(error);
      console.error("Login error", error);
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
        <Text fontSize="14px" m="24px" textAlign="center">
          <Link to="/login" as={RouterLink} {...styles.link}>
            Forgot password?
          </Link>
        </Text>
        <Text fontSize="14px" m="24px" textAlign="center">
          Don't have a naya account? &nbsp;
          <Link to="/register" as={RouterLink} {...styles.link}>
            Create one
          </Link>
        </Text>
      </Form>
    </Formik>
  );
}

export default LoginForm;
