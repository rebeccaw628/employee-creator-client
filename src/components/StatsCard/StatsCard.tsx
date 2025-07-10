interface StatsCardProps extends React.PropsWithChildren {
  variants?: string;
  bold: string | number;
  content: string | number;
}

const StatsCard = ({ variants, bold, content, children }: StatsCardProps) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-48 h-32 text-white shadow-lg border border-gray-600 rounded-sm bg-gradient-to-br from-indigo-500 to-purple-500 font-semibold">
      <p className={variants}>
        <span className="font-bold">{bold} </span>
        {content}
      </p>
      {children}
    </div>
  );
};

export default StatsCard;
