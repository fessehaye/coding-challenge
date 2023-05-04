export enum VehicleDirection {
  NorthBound = "NB",
  SouthBound = "SB",
  EastBound = "EB",
  WestBound = "WB",
}

export enum VehicleTurn {
  Left = "L",
  Right = "R",
  Through = "T",
}

export enum PedestrianTurn {
  Clockwise = "CW",
  CounterClockwise = "CCW",
}

export enum PedestrianDirection {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

export interface PedestrianData {
  unique_id: string;
  timestamp: string;
  road_user_type: "Peds";
  direction: PedestrianDirection;
  turn: PedestrianTurn | null;
  count: number;
}

export interface VehicleData {
  unique_id: string;
  timestamp: string;
  road_user_type: Exclude<string, "Peds">;
  direction: VehicleDirection;
  turn: VehicleTurn;
  count: number;
}

export type JsonData = PedestrianData | VehicleData;

export type GroupedData = Record<string, JsonData[]>;
