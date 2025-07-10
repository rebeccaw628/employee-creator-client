import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconAndTextLabelProps {
  icon: IconDefinition;
  text: string | number;
  spacing?: "compact" | "spacious";
  variant?: string;
}

const IconAndTextLabel = ({
  icon,
  text,
  spacing = "compact",
  variant = "",
}: IconAndTextLabelProps) => {
  const labelClass = spacing === "compact" ? "gap-4" : "gap-8";
  return (
    <div className={`flex items-center ${labelClass} ${variant}`}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default IconAndTextLabel;
