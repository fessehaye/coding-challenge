import { getColumnInformation } from "../utils";

function TableHeader({
  selectedRoadUserType,
}: {
  selectedRoadUserType: string;
}) {
  const [directions, turns] = getColumnInformation(selectedRoadUserType);
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        <th scope="col" className="px-6 py-3 rounded-tl-lg"></th>
        <th scope="col" className="px-6 py-3">
          Time Interval
        </th>
        {directions.map((direction, index) => (
          <th
            scope="col"
            key={direction}
            className={
              index === directions.length - 1
                ? "px-2 py-3 text-center rounded-tr-lg"
                : "px-2 py-3 text-center"
            }
            colSpan={turns.length}
          >
            {direction}
          </th>
        ))}
      </tr>

      <tr>
        <th scope="col" className="px-6 py-3" colSpan={2}></th>
        {directions.map((direction) =>
          turns.map((turn) => (
            <th
              scope="col"
              key={direction + turn}
              className="px-2 py-3 text-center"
            >
              {direction + turn}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
