import { RegistrationStatus } from "@/misc/enums";

interface StatusProps {
  status: RegistrationStatus;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const statusColorMapText: { [key in StatusProps["status"]]: string } = {
    Completed: "text-green-600",
    Rejected: "text-red-600",
  };

  const statusColorMapBg: { [key in StatusProps["status"]]: string } = {
    Completed: "bg-green-100",
    Rejected: "bg-red-100",
  };

  return (
    <div
      className={`${statusColorMapBg[status]} px-3 py-1 rounded-full float-left`}
    >
      <p className={`${statusColorMapText[status]} text-sm`}>{status}</p>
    </div>
  );
};

export default Status;
