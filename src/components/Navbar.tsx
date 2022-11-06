import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as NayaIcon } from "../naya.svg";
import CircleIcon from "../icons/CircleIcon";
import { Canvas } from "../hooks/query/canvas/useCanvases";
import { CurrentUser } from "../hooks/query/useCurrentUser";

export type Collaborator = {
  _id: string;
  firstName: string;
  lastName: string;
  color: string;
};

export type CurrentCanvas = {
  _id: string;
  name: string;
  owner: string;
  collaborators: Collaborator[];
  imgBase64: string;
};

type NavbarProps = {
  canvases: Canvas[];
  owner: CurrentUser;
  currentCanvas: CurrentCanvas;
  onOpen: () => void;
  currentSketchId: string;
};

type NavLinkProps = { url: string; children: React.ReactNode };

const NavLink = (props: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={RouterLink}
    to={props.url}
  >
    {props.children}
  </Link>
);

export const Navbar = (props: NavbarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const Links = [{ name: "Projects", url: `/${props.spaceName}/projects` }];

  // console.log(props?.canvases);
  return (
    <Box px="5" boxShadow="md">
      <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          // icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: !isOpen ? "none" : "inherit" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Heading fontSize={["24px"]} fontWeight="bold" color="#4F00C1">
              <NavLink url={`/sketches`}>
                <NayaIcon />
              </NavLink>
            </Heading>
          </Box>
        </HStack>

        <HStack alignItems={"center"} spacing={8}>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                fontSize="12px"
                fontWeight={500}
                px={6}
              >
                USERS
              </MenuButton>
              <MenuList fontSize="12px" fontWeight={400} px={5}>
                {props.currentCanvas
                  ? props.currentCanvas.collaborators.map((collaborator) => (
                      <MenuItem key={collaborator._id}>
                        <CircleIcon fill={collaborator.color} />
                        <Text
                          ml={4}
                        >{`${collaborator.firstName} ${collaborator.lastName}`}</Text>
                      </MenuItem>
                    ))
                  : null}
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                fontSize="12px"
                as={Button}
                size="sm"
                fontWeight={500}
                px={6}
              >
                SKETCHES
              </MenuButton>
              <MenuList fontSize="12px" fontWeight={400} px={5}>
                {props.canvases
                  ? props.canvases.map((canvas) => (
                      <MenuItem
                        key={canvas._id}
                        as={RouterLink}
                        to={`/sketches/${canvas._id}`}
                        color={
                          canvas._id === props?.currentSketchId
                            ? "#4F00C1"
                            : "#161616"
                        }
                        fontWeight={
                          canvas._id === props?.currentSketchId ? "700" : "400"
                        }
                      >
                        {canvas.name}
                      </MenuItem>
                    ))
                  : null}
                <MenuItem onClick={props.onOpen}>Create New</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Heading fontWeight={500} fontSize="14px" color="#161616">
            {`${props.owner?.firstName} ${props.owner?.lastName}`}
          </Heading>
          <Box>
            <Avatar
              size="sm"
              name={`${props.owner?.firstName} ${props.owner?.lastName}`}
              bg={props.owner?.color}
            />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};
