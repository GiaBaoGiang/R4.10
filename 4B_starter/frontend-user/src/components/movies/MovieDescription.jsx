import { useState } from "react";
import Button from "../common/Button";
function MovieDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start ">
      <p className={isExpanded ? "" : "line-clamp-2"}>{description}</p>
      <Button
      className="self-end my-2"
        variant="secondary"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Voir moins" : "Voir plus"}
      </Button>
    </div>
  );
}
export default MovieDescription;
