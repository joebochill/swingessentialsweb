const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const prettyDate = (string: string): string => {
    if (!string.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
        return string;
    }
    const date = string.split('-');
    return `${months[parseInt(date[1], 10) - 1]} ${parseInt(date[2])}, ${date[0]}`
};
