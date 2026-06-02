import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav
      className="flex items-center text-xs font-medium leading-tight text-neutral-500"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index !== 0 && <ChevronRight size={14} />}

          {item.link ? (
            <Link to={item.link} className="hover:text-black">
              {item.label?.toUpperCase()}
            </Link>
          ) : (
            <span className="font-medium text-primary">{item.label?.toUpperCase()}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
