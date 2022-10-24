import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Stack, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Link as RouterLink } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CreateCanvasModal } from "../components/modals/CreateCanvasModal";

function fetchCurrentUser(axiosPrivate) {
  return axiosPrivate.get(`/api/users/current-user`);
}

function fetchCanvases(axiosPrivate) {
  return axiosPrivate.get(`/api/canvas`);
}

function Boards() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [owner, setOwner] = React.useState(null);
  // const [canvases, setCanvases] = React.useState([]);

  const axiosPrivate = useAxiosPrivate();

  const currentUserQuery = useQuery(["currentUser"], () =>
    fetchCurrentUser(axiosPrivate)
  );

  const canvasesQuery = useQuery(["canvases"], () =>
    fetchCanvases(axiosPrivate)
  );

  const currentUser = currentUserQuery?.data?.data;
  const canvases = canvasesQuery?.data?.data;

  // React.useEffect(() => {
  //   async function fetchCurrentUser() {
  //     try {
  //       const response = await axiosPrivate.get(`/api/users/current-user`);

  //       console.log("cureent user", response.data);

  //       if (response) {
  //         setOwner(response.data);
  //       }
  //     } catch (error) {
  //       // TODO: handle errors
  //       if (error.response) {
  //         console.log("hell", error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.data.name);
  //       }
  //       alert(error);
  //     }
  //   }
  //   fetchCurrentUser();
  // }, []);

  // React.useEffect(() => {
  //   async function fetchCanvases() {
  //     try {
  //       const response = await axiosPrivate.get(`/api/canvas`);

  //       console.log("canvas rs", response.data);

  //       if (response) {
  //         setCanvases(response.data);
  //       }
  //     } catch (error) {
  //       // TODO: handle errors
  //       if (error.response) {
  //         console.log("hell", error.response);
  //         console.log(error.response.status);
  //         console.log(error.response.data.name);
  //       }
  //       alert(error);
  //     }
  //   }
  //   fetchCanvases();
  // }, []);

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
                    : null
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
