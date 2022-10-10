import React from "react";
import { Box, Center, Stack } from "@chakra-ui/layout";

export const FormContainer = (props) => {
  return (
    <Center h={[null, "100vh"]}>
      <Stack w={["100%", "416px"]} spacing={6} p={["24px", "0px"]}>
        <Box
          w="100%"
          boxShadow={[null, "lg"]}
          rounded="lg"
          px={[null, "40px"]}
          py={[null, "32px"]}
        >
          {props.children}
        </Box>
      </Stack>
    </Center>
  );
};
