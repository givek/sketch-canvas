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

export type Canvas = {
  _id: string;
  name: string;
  owner: string;
  path: string;
  collaborators?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CanvasU = {
  _id: string;
  name: string;
  owner: string;
  collaborators: Collaborator[];
  imgBase64: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUser = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
};
