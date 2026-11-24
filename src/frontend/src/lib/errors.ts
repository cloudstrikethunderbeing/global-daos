/** Human-readable message for a backend error variant. */
export function describeBackendError(error: {
  __kind__: string;
  [key: string]: unknown;
}): string {
  switch (error.__kind__) {
    case "notAuthorized":
      return "You do not have permission to do that.";
    case "invalidInput":
      return typeof error.invalidInput === "string"
        ? error.invalidInput
        : "Some of the details are not valid.";
    case "notFound":
      return "We could not find that record.";
    case "limitExceeded":
      return typeof error.limitExceeded === "string"
        ? error.limitExceeded
        : "You have reached a limit.";
    case "slugTaken":
      return "That public link is already taken. Try another.";
    case "duplicate":
      return "That has already been recorded.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
