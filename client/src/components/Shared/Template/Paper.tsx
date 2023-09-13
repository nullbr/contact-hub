const Paper = ({
  cls = "",
  children,
}: {
  cls?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${
        cls === "" ? "p-4 mb-4" : cls
      }`}
    >
      {children}
    </div>
  );
};
export default Paper;
