import { useEffect, useState } from "react";
import { JsonData, GroupedData } from "./types";
import {
  getAllReportDates,
  getRoadUserTypes,
  groupedDataByQuarterIntervals,
} from "./utils";
import Header from "./components/Header";
import Filter from "./components/Filter";
import DataTable from "./components/DataTable";

function App() {
  // TODO replace with useReducer and useContext
  const [jsonData, setJsonData] = useState<GroupedData>({});
  const [roadUserTypes, setRoadUserTypes] = useState<string[]>([]);
  const [selectedRoadUserType, setSelectedRoadUserType] =
    useState<string>("All Vehicles");
  const [reportDates, setReportDates] = useState<string[]>([]);
  const [selectedReportDate, setSelectedReportDate] = useState<string>("");
  const [peakHour, setPeakHour] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json");
        const data: JsonData[] = await response.json();
        setJsonData(groupedDataByQuarterIntervals(data));
        setReportDates(getAllReportDates(data));
        setSelectedReportDate(getAllReportDates(data)[0]);
        setRoadUserTypes(getRoadUserTypes(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedReportDate(event.target.value);
  }

  return (
    <main className="bg-slate-300 w-full min-h-screen overflow-auto">
      <Header
        reportDates={reportDates}
        selectedReportDate={selectedReportDate}
        handleSelectChange={handleSelectChange}
      />
      <div className="mx-auto max-w-screen-2xl p-4">
        <Filter
          roadUserTypes={roadUserTypes}
          peakHour={peakHour}
          setPeakHour={setPeakHour}
          selectedRoadUserType={selectedRoadUserType}
          setSelectedRoadUserType={setSelectedRoadUserType}
        />
        <DataTable
          jsonData={jsonData}
          peakHour={peakHour}
          selectedRoadUserType={selectedRoadUserType}
          selectedReportDate={selectedReportDate}
        />
      </div>
    </main>
  );
}

export default App;
