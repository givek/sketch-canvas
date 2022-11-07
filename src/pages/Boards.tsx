import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Stack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";

import { Link as RouterLink } from "react-router-dom";

import { CreateCanvasModal } from "../components/modals/CreateCanvasModal";
import useCanvases from "../hooks/query/canvas/useCanvases";
import useCurrentUser from "../hooks/query/useCurrentUser";

function Boards() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentUserQuery = useCurrentUser();
  const canvasesQuery = useCanvases();

  console.log(currentUserQuery);

  if (currentUserQuery.isLoading || canvasesQuery.isLoading) {
    return <div>Loading</div>;
  }

  const currentUser = currentUserQuery?.data;
  const canvases = canvasesQuery?.data;

  return (
    <Box px="56px" py="48px">
      <CreateCanvasModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Box px="110px" py="48px">
        <Wrap>
          <WrapItem>
            <Stack direction="row" alignItems="center" spacing="4">
              <Avatar
                size="lg"
                bg={currentUser?.color}
                name={
                  currentUser
                    ? `${currentUser?.firstName} ${currentUser?.lastName}`
                    : ""
                }
              />
              <Text fontWeight="semibold" textTransform="capitalize">
                {currentUser
                  ? `${currentUser?.firstName} ${currentUser?.lastName}`
                  : null}
              </Text>
            </Stack>
          </WrapItem>
        </Wrap>
        <Box py="48px">
          <Text fontSize="26px">Your Canvases</Text>
        </Box>
        <Stack direction="row" spacing="12">
          {canvases
            ? canvases.map((canvas) => (
                <Button
                  as={RouterLink}
                  to={`/sketches/${canvas._id}`}
                  key={canvas._id}
                  bgColor="#fff"
                  w="136px"
                  h="104px"
                  boxShadow="md"
                  borderRadius="md"
                >
                  {canvas.name}
                </Button>
              ))
            : null}
          <Button
            bgColor="#fff"
            w="136px"
            h="104px"
            boxShadow="md"
            borderRadius="md"
            onClick={onOpen}
          >
            Add new
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Boards;
