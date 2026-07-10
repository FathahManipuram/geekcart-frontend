import { STATUS_STYLES } from "../../constants/return.constants";

const ReturnStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]} `}
    >
      {status?.replaceAll("_", " ")?.toUpperCase()}
    </span>
  );
};

export default ReturnStatusBadge;
