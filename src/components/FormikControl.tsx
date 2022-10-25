import Input from "./formFields/Input";

export type FromikControlProps = {
  control: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  styles?: React.CSSProperties;
  helpText?: string;
};

function FormikControl({ control, ...rest }: FromikControlProps) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
