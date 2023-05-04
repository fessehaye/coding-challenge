import { GroupedData } from "../types";
import {
  displayRelatedDateHeader,
  getColumnInformation,
  getCount,
  getTotalCount,
} from "../utils";

function TableBody({
  header,
  jsonData,
  selectedRoadUserType,
}: {
  header: string;
  jsonData: GroupedData;
  selectedRoadUserType: string;
}) {
  const [directions, turns] = getColumnInformation(selectedRoadUserType);
  const sortedTimeStamps = Object.keys(jsonData).sort();

  return (
    <tbody>
      {sortedTimeStamps.map((key, index) => (
        <tr key={key} className="bg-white">
          {index === 0 && (
            <th
              rowSpan={Object.keys(jsonData).length}
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {header}
            </th>
          )}
          <td className="px-2 py-4">{displayRelatedDateHeader(key)}</td>
          {directions.map((direction) =>
            turns.map((turn) => (
              <td key={direction + turn} className="px-2 py-4 text-center">
                {getCount(jsonData[key], selectedRoadUserType, direction, turn)}
              </td>
            ))
          )}
        </tr>
      ))}
      <tr className="bg-gray-100 font-bold">
        <th className="px-2 py-4"></th>
        <td className="px-2 py-4">Total Volume</td>
        {directions.map((direction) =>
          turns.map((turn) => (
            <td key={direction + turn} className="px-2 py-4 text-center">
              {getTotalCount(jsonData, selectedRoadUserType, direction, turn)}
            </td>
          ))
        )}
      </tr>
    </tbody>
  );
}

export default TableBody;
