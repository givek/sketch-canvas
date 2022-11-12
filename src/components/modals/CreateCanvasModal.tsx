import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { Formik, Form, FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import FormikControl from "../FormikControl";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

type CreateCanvasModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
};

type CanvasResponseData = {
  name: string;
  owner: string;
  path: string;
  collaborators: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const initialValues = {
  name: "",
};

export const CreateCanvasModal = (props: CreateCanvasModalProps) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const histroy = useHistory();

  const createNewCanvasQuery = useMutation<
    CanvasResponseData,
    any,
    typeof initialValues
  >(
    async (newCanvas) => {
      const { data } = await axiosPrivate.post<CanvasResponseData>(
        "api/canvas/",
        newCanvas
      );
      return data;
    },
    {
      onSuccess: (canvas) => {
        props.onClose();
        histroy.push(`/sketches/${canvas._id}`);
        return queryClient.setQueriesData<CanvasResponseData>(
          ["canvases"],
          (oldQueryData) => {
            if (oldQueryData) {
              return { ...oldQueryData, canvas };
            }
          }
        );
      },
    }
  );

  const onSumbit = async (
    data: typeof initialValues,
    { setErrors }: FormikHelpers<typeof initialValues>
  ) => {
    console.log(`form data`, data.name);

    createNewCanvasQuery.mutate(data, {
      onError: (error: any, variables, context) => {
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
                placeholder="Canvas"
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
