import {
  GroupedData,
  JsonData,
  PedestrianDirection,
  PedestrianTurn,
  VehicleDirection,
  VehicleTurn,
} from "./types";

// TODO split up utils into smaller files

export function groupedDataByQuarterIntervals(
  jsonData: JsonData[]
): GroupedData {
  return jsonData.reduce((acc: GroupedData, obj: JsonData) => {
    const timestamp = new Date(obj.timestamp);
    const minute = timestamp.getMinutes();
    const interval = minute - (minute % 15);
    const key = new Date(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate(),
      timestamp.getHours(),
      interval,
      0,
      0
    ).toISOString();

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
}

export function getAllReportDates(jsonData: JsonData[]): string[] {
  return jsonData.reduce((acc: string[], obj: JsonData) => {
    const timestamp = new Date(obj.timestamp);
    const date = new Date(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate(),
      0,
      0,
      0,
      0
    ).toISOString();

    if (!acc.includes(date)) {
      acc.push(date);
    }

    return acc;
  }, []);
}

export function getRoadUserTypes(jsonData: JsonData[]): string[] {
  const result = [...new Set(jsonData.map((obj) => obj.road_user_type))];
  result.sort();
  return result;
}

export function isSameDay(timestamp1: string, timestamp2: string): boolean {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function checkIfAMOrPM(timestamp: string): "PM" | "AM" {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  return ampm;
}

export function getColumnInformation(
  selectedRoadUserType: string
): (
  | VehicleDirection[]
  | PedestrianDirection[]
  | VehicleTurn[]
  | PedestrianTurn[]
)[] {
  const directions =
    selectedRoadUserType !== "Peds"
      ? Object.values(VehicleDirection)
      : Object.values(PedestrianDirection);

  const turns =
    selectedRoadUserType !== "Peds"
      ? Object.values(VehicleTurn)
      : Object.values(PedestrianTurn);

  return [directions, turns];
}

export function displayRelatedDateHeader(timestamp: string): string {
  const startDate = new Date(timestamp);
  const endDate = new Date(startDate.getTime() + 15 * 60000);

  return `${startDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

export function getCount(
  jsonData: JsonData[],
  selectedRoadUserType: string,
  direction: string,
  turn: string
): number {
  return jsonData
    .filter(
      (obj) =>
        obj.road_user_type === selectedRoadUserType &&
        obj.direction === direction &&
        obj.turn === turn
    )
    .reduce((acc, obj) => acc + obj.count, 0);
}

export function getTotalCount(
  groupedData: GroupedData,
  selectedRoadUserType: string,
  direction: string,
  turn: string
): number {
  return Object.keys(groupedData).reduce((acc, key) => {
    return (
      acc + getCount(groupedData[key], selectedRoadUserType, direction, turn)
    );
  }, 0);
}

export function getPeakHour(groupedData: GroupedData): GroupedData {
  let largestSequence: JsonData[][] = [];
  let largestSequenceKeys: string[] = [];

  const currentSequence: JsonData[][] = [];
  const currentSequenceKeys: string[] = [];

  for (const key of Object.keys(groupedData)) {
    // Add the current timeslot to the current sequence
    currentSequence.push(groupedData[key]);
    currentSequenceKeys.push(key);

    // If the current sequence has more than four timeslots, remove the first one
    if (currentSequence.length > 4) {
      currentSequence.shift();
      currentSequenceKeys.shift();
    }

    if (currentSequence.length === 4) {
      const sum = currentSequence.reduce((acc, cur) => {
        return (
          acc +
          cur.reduce((groupTotal, jsonObj) => groupTotal + jsonObj.count, 0)
        );
      }, 0);
      const largestSum = largestSequence.reduce((acc, cur) => {
        return (
          acc +
          cur.reduce((groupTotal, jsonObj) => groupTotal + jsonObj.count, 0)
        );
      }, 0);
      if (sum > largestSum) {
        largestSequence = [...currentSequence];
        largestSequenceKeys = [...currentSequenceKeys];
      }
    }
  }

  return largestSequenceKeys.reduce((acc, cur, index) => {
    acc[cur] = largestSequence[index];
    return acc;
  }, {} as GroupedData);
}
