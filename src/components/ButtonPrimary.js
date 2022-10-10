import { Button } from '@chakra-ui/button';
import React from 'react';

export const ButtonPrimary = props => {
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
