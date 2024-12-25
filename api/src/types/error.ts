export interface ValidateError {
  field?: string;
  message: string;
}

export interface ErrorResponse {
  errors: ValidateError[];
  message: string;
  statusCode: number;
}

export const createValidationError = (
  field: string,
  message: string,
): ValidateError => ({
  field,
  message,
});

export const createErrorResponse = (
  statusCode: number,
  message: string,
  errors?: ValidateError[],
): ErrorResponse => ({
  errors: errors || [],
  message,
  statusCode,
});

export const handleZodError = (zodError: any): ValidateError[] => {
  return Object.entries(zodError.flatten().fieldErrors).map(
    ([field, messages]) => ({
      field,
      message: Array.isArray(messages) ? messages[0] : messages,
    }),
  );
};

export const handleValidationError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    return createErrorResponse(400, 'Validation failed', [
      createValidationError('', error.message),
    ]);
  }
  return createErrorResponse(500, 'Internal server error');
};
