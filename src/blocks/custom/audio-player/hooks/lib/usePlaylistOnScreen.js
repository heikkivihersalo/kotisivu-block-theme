import { useEffect, useState, useRef } from '@wordpress/element';

function usePlaylistOnScreen(options) {
    const playlistRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFn = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFn, options);
        if (playlistRef.current) observer.observe(playlistRef.current);

        return () => {
            if (playlistRef.current) observer.unobserve(playlistRef.current);
        }
    }, [playlistRef.current, options]);

    return [playlistRef, isVisible];
}

export { usePlaylistOnScreen }