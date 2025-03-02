// Returns a number rounded to the specified number of decimal places
export function roundNumber(num: number, places: number): number {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
