function Filter({
  roadUserTypes,
  peakHour,
  setPeakHour,
  selectedRoadUserType,
  setSelectedRoadUserType,
}: {
  roadUserTypes: string[];
  peakHour: boolean;
  setPeakHour: (value: boolean) => void;
  selectedRoadUserType: string;
  setSelectedRoadUserType: (value: string) => void;
}) {
  return (
    <div className="flex items-center flex-wrap bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-6">
      <div className="flex mr-4 flex-wrap w-2/3">
        {roadUserTypes.map((roadUserType) => (
          <div key={roadUserType} className="flex items-center mr-4 mb-2">
            <input
              id={roadUserType}
              type="radio"
              name="road-user-type"
              checked={selectedRoadUserType === roadUserType}
              onChange={() => setSelectedRoadUserType(roadUserType)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor={roadUserType}
              className="ml-2 text-sm font-bold text-gray-900 whitespace-nowrap"
            >
              {roadUserType}
            </label>
          </div>
        ))}
      </div>

      <div className="flex items-center ml-auto">
        <input
          id="peak-hour"
          type="checkbox"
          checked={peakHour}
          onChange={(event) => setPeakHour(event.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="peak-hour"
          className="ml-2 text-sm font-bold text-gray-900"
        >
          Show Peak Hours Only
        </label>
      </div>
    </div>
  );
}

export default Filter;
