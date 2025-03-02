const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const prettyDate = (string: string): string => {
    const dateFormat = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    if (!dateFormat.exec(string)) {
        return string;
    }
    const date = string.split('-');
    return `${months[parseInt(date[1], 10) - 1]} ${parseInt(date[2])}, ${date[0]}`;
};

export function getDate(unix: number): string {
    const day = new Date(unix);
    let dd: string | number = day.getUTCDate();
    let mm: string | number = day.getUTCMonth() + 1;
    const yyyy = day.getUTCFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
}

export const formatTimer = (remaining: number): string => {
    if (!remaining || remaining <= 0) {
        return '00:00';
    }

    const min = Math.floor(remaining / 60);
    const sec = Math.floor(remaining - min * 60);

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
