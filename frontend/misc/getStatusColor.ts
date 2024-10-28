import { RegistrationStatus } from "./enums";

export const getStatusColor = (status: string) => {
  switch (status) {
    case RegistrationStatus.Complete:
      return "green";
    case RegistrationStatus.Pending:
      return "orange";
    case RegistrationStatus.Rejected:
      return "red";
    default:
      return "gray";
  }
};
