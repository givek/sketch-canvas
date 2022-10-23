import React from "react";
import { Button } from "@chakra-ui/button";

export const ButtonPrimary = (props) => {
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
};
