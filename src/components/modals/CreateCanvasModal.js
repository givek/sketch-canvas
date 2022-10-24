import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Formik, Form } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { FormikControl } from "../FormikControl";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const initialValues = {
  name: "",
};

export const CreateCanvasModal = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const histroy = useHistory();
  const createNewCanvasQuery = useMutation(
    (canvas) => axiosPrivate.post(`api/canvas`, canvas),
    {
      onSuccess: (data) => {
        props.onClose();
        histroy.push(`/sketches/${data.data._id}`);
        return queryClient.setQueriesData(["canvases"], (oldQueryData) => {
          return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
        });
      },
    }
  );

  const onSumbit = async (data = {}, { setErrors }) => {
    console.log(`form data`, data.name);
    createNewCanvasQuery.mutate(data, {
      onError: (error, variables, context) => {
        if (error.response && error.response.data) {
          setErrors({ name: error.response.data.message });
        }
      },
    });
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <Formik initialValues={initialValues} onSubmit={onSumbit}>
        <Form>
          <ModalContent>
            <ModalHeader fontWeight="medium">Canvas name</ModalHeader>
            <ModalBody>
              <FormikControl
                control="input"
                type="text"
                name="name"
                label="Canvas name"
                size="sm"
                placeholder="Naya"
                helpText="Choose something familiar like your team name."
              />
            </ModalBody>
            <ModalFooter>
              <Button size="sm" variant="ghost" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button type="submit" size="sm" colorScheme="blue">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Formik>
    </Modal>
  );
};
