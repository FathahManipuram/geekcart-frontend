import { STATUS_STYLES } from "../../constants/return.constants";


const ReturnStatusBadge = ({ status }) => {
  return (
    <span
      className={`
        px-3 py-1 rounded-full
        text-xs font-medium
        ${STATUS_STYLES[status]}
      `}
    >
      {status?.replaceAll("_", " ")?.toUpperCase()}
    </span>
  );
};

export default ReturnStatusBadge;
