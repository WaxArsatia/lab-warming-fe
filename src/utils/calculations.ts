import type { DataPoint } from "../types/sensor";

export function calculateAverage(
  data: DataPoint[],
  key: "temperature" | "humidity",
): number {
  if (data.length === 0) return 0;
  return data.reduce((sum, d) => sum + d[key], 0) / data.length;
}

export function calculateMin(
  data: DataPoint[],
  key: "temperature" | "humidity",
): number {
  if (data.length === 0) return 0;
  return Math.min(...data.map((d) => d[key]));
}

export function calculateMax(
  data: DataPoint[],
  key: "temperature" | "humidity",
): number {
  if (data.length === 0) return 0;
  return Math.max(...data.map((d) => d[key]));
}
