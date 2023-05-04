function Header({
  reportDates,
  selectedReportDate,
  handleSelectChange,
}: {
  reportDates: string[];
  selectedReportDate: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    return formatter.format(date);
  };

  return (
    <div className="flex items-center justify-between rounded-sm border bg-white py-6 px-7 shadow">
      <h1 className="font-sans font-bold">Count Table</h1>
      <div className="flex items-center">
        <label
          htmlFor="reportDate"
          className="text-sm font-bold mr-2 block whitespace-nowrap text-gray-900"
        >
          Report Date:
        </label>
        <select
          id="reportDate"
          onChange={handleSelectChange}
          value={selectedReportDate}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
        >
          {reportDates.map((reportDate) => (
            <option key={reportDate} value={reportDate}>
              {formatDate(reportDate)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Header;
