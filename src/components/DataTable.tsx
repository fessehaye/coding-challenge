import { GroupedData } from "../types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { checkIfAMOrPM, getPeakHour, isSameDay } from "../utils";

function DataTable({
  jsonData,
  peakHour,
  selectedRoadUserType,
  selectedReportDate,
}: {
  jsonData: GroupedData;
  peakHour: boolean;
  selectedRoadUserType: string;
  selectedReportDate: string;
}) {
  const todayData: GroupedData = Object.keys(jsonData)
    .filter((key) => isSameDay(key, selectedReportDate))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: jsonData[key] });
    }, {});

  let AMData: GroupedData = Object.keys(todayData)
    .filter((key) => checkIfAMOrPM(key) === "AM")
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: todayData[key] });
    }, {});

  let PMData: GroupedData = Object.keys(todayData)
    .filter((key) => checkIfAMOrPM(key) === "PM")
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: todayData[key] });
    }, {});

  AMData = peakHour ? getPeakHour(AMData) : AMData;
  PMData = peakHour ? getPeakHour(PMData) : PMData;

  return (
    <div className="relative overflow-x-auto mt-6">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHeader selectedRoadUserType={selectedRoadUserType} />
        {Object.keys(AMData).length > 0 && (
          <TableBody
            header="Traffic Volume (AM)"
            jsonData={AMData}
            selectedRoadUserType={selectedRoadUserType}
          />
        )}
        {Object.keys(PMData).length > 0 && (
          <TableBody
            header="Traffic Volume (PM)"
            jsonData={PMData}
            selectedRoadUserType={selectedRoadUserType}
          />
        )}
      </table>
    </div>
  );
}

export default DataTable;
