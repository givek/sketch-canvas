import { Button } from "@chakra-ui/button";

type ButtonPrimaryProps = {
  name: string;
};

function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <Button
      boxShadow="md"
      color="#fff"
      backgroundColor="#4F00C1"
      size="sm"
      type="submit"
    >
      {props.name}
    </Button>
  );
}

export default ButtonPrimary;
