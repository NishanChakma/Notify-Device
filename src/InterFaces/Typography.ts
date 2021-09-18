import { useMediaQuery } from "react-responsive";
export const bigMonitor = useMediaQuery({ minWidth: 1824 });
export const mediumMonitor = useMediaQuery({ minWidth: 1360, maxWidth: 1823 });
export const smallMonitor = useMediaQuery({ minWidth: 1225, maxWidth: 1359 });
export const isMobile = useMediaQuery({ maxWidth: 1224 });
