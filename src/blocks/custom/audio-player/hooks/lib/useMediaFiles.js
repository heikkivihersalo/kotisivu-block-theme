import { getMediaFiles } from '../../scripts/helpers.js';
import { useEffect, useState } from '@wordpress/element';

function useMediaFiles(trackRef) {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getFiles = async () => {
            let files = await getMediaFiles({
                per_page: 25,
                media_type: 'audio',
            });

            await setFiles(files);

            trackRef.current = {
                id: 0,
                title: files[0]?.title?.rendered,
                album: files[0]?.media_details?.album,
                artist: files[0]?.media_details?.artist,
                format: files[0]?.media_details?.fileformat,
                sampleRate: files[0]?.media_details?.sample_rate,
                src: files[0]?.source_url,
                duration: files[0]?.media_details?.length,
                durationFormatted: files[0]?.media_details?.length_formatted,
                featuredImage: {
                    src: files[0]?.metadata?.featured_image?.url,
                    alt: files[0]?.metadata?.featured_image?.alt,
                    height: files[0]?.metadata?.featured_image?.height,
                    width: files[0]?.metadata?.featured_image?.width,
                    title: files[0]?.metadata?.featured_image?.title
                }
            };

            setIsLoading(false);
        }

        getFiles();
    }, []);

    return [files, isLoading];
}

export { useMediaFiles }
