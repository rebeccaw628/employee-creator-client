import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconAndTextLabelProps {
  icon: IconDefinition;
  text: string | number;
  spacing?: "compact" | "spacious";
}

const IconAndTextLabel = ({
  icon,
  text,
  spacing = "spacious",
}: IconAndTextLabelProps) => {
  const labelClass = spacing === "compact" ? "gap-4" : "gap-8";
  return (
    <div className={`flex ${labelClass}`}>
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
};

export default IconAndTextLabel;
