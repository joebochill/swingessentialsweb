export const splitParagraphText = (string: string): string[] => {
    if (!string.length) {
        return [];
    }
    return string.split('|:::|');
};
