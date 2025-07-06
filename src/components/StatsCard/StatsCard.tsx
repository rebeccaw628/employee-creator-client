interface StatsCardProps {
  variants?: string;
  bold: string | number;
  content: string | number;
}

const StatsCard = ({ variants, bold, content }: StatsCardProps) => {
  return (
    <div>
      <p className={variants}>
        <span className="font-bold text-black">{bold} </span>
        {content}
      </p>
    </div>
  );
};

export default StatsCard;
