import { YoutubeVideoStatus } from '../__types__';

export const getYoutubeVideoErrorMessage = (video: string, status: YoutubeVideoStatus): string => {
    if (!video || video.length === 0) return '';
    if (video && video.length !== 11) return 'Video ID must be 11 characters';
    switch (status) {
        case 'invalid':
            return 'YouTube video not found for ID';
        case 'malformed':
            return 'Youtube video ID is invalid / malformed';
        case 'private':
            return 'YouTube video is marked as private';
        case 'valid':
        default:
            return '';
    }
};
