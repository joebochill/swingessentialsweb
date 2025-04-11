// Returns a number rounded to the specified number of decimal places
export function roundNumber(num: number, places: number): number {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
export const formatTimer = (remaining: number): string => {
    if (!remaining || remaining <= 0) {
        return '00:00';
    }

    const min = Math.floor(remaining / 60);
    const sec = Math.floor(remaining - min * 60);

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
