import { useColorScheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";
// import ReactGA from 'react-ga';
// import { YoutubeVideoStatus } from '../__types__';

// eslint-disable-next-line @typescript-eslint/ban-types
export const usePrevious = <T extends {}>(value: T): T | undefined => {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || undefined;
};

export const useDarkMode = () => {
  const { mode, systemMode } = useColorScheme();
  return {
    isDarkMode: mode === "dark" || (mode === "system" && systemMode === "dark"),
  };
};
// export const useCompare = (val: any): boolean => {
//     const prevVal = usePrevious(val);
//     return prevVal !== val;
// };

// export const useGoogleAnalyticsPageView = (): void => {
//     useEffect(() => {
//         ReactGA.pageview(window.location.pathname);
//     }, []);
// };

// export const googleAnalyticsConversion = (conversionRoute: string = window.location.pathname): void => {
//     ReactGA.pageview(conversionRoute);
// };

// export const useVideoValid = (video = '', setVideoStatus: (status: YoutubeVideoStatus) => void): void => {
//     useEffect((): void => {
//         // Check if the video code is valid/reachable
//         if (video && video.length !== 11) {
//             setVideoStatus('malformed');
//             return;
//         }
//         fetch(`https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=${video}`, {
//             method: 'GET',
//         })
//             .then((response: Response): void => {
//                 switch (response.status) {
//                     case 404:
//                         setVideoStatus('invalid');
//                         break;
//                     case 403:
//                         setVideoStatus('private');
//                         break;
//                     case 400: {
//                         setVideoStatus('malformed');
//                         break;
//                     }
//                     default:
//                         setVideoStatus('valid');
//                         break;
//                 }
//             })
//             .catch((error: Error) => {
//                 console.error('Unable to determine video validity', error);
//             });
//     }, [video]);
// };
