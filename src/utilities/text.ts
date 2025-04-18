export const splitDatabaseText = (string: string): string[] => {
    if (!string || string.length < 1) {
        return [];
    }
    return string.split('|:::|');
};

export const convertDatabaseTextToMultiline = (string: string): string => {
    const list = splitDatabaseText(string);
    return list.join('\r\n\r\n');
};

export const convertMultilineToDatabaseText = (string: string): string => {
    if (!string.length) {
        return '';
    }

    const array = string.split(/[\r\n]+/);
    return array.join('|:::|');
};
