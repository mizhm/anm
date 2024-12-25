export type ResponseError = {
  response: {
    data?: {
      errors?: { field: string; message: string }[];
      message?: string;
    };
  };
};
