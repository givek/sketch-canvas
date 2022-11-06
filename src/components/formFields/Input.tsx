import { Input as ChakraInput } from "@chakra-ui/input";
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Field, FieldProps } from "formik";
import { FormHelperText } from "@chakra-ui/form-control";
import { FromikControlProps } from "../FormikControl";

type InputProps = Omit<FromikControlProps, "control">;

function Input({ name, label, helpText, ...rest }: InputProps) {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string>) => (
        <FormControl
          isInvalid={form.errors[name] && form.touched[name] ? true : false}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <ChakraInput id={name} {...rest} {...field} />
          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
          {helpText ? <FormHelperText>{helpText}</FormHelperText> : null}
        </FormControl>
      )}
    </Field>
  );
}

export default Input;
