import { useMediaQuery } from 'react-responsive'

export  function useBreakPoint() {
    const isMobile = useMediaQuery({ maxWidth: 799 });
    const isTinyDesktop = useMediaQuery({ minWidth: 800, maxWidth: 1249 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1250 });

    return { isMobile, isTinyDesktop, isLargeDesktop };
}
