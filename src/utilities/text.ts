export const splitParagraphText = (string: string): string[] => {
    if (!string.length) {
        return [];
    }
    return string.split('|:::|');
};
export const capitalize = (str: string): string => {
    if (str.length < 1) return str;
    return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
};
