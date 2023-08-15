/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import { __ } from "@wordpress/i18n";
import domReady from '@wordpress/dom-ready';
import { useEffect, useState, useRef } from '@wordpress/element';

/**
 * Contexts
 */
import PlayerContext from './context/PlayerContext.js';

/**
 * Hooks
 */
import { usePlaylistOnScreen } from './hooks/usePlaylistOnScreen.js';

/**
 * Components
 */
import AudioPlayer from './components/AudioPlayer.jsx';
import { Placeholder } from './icons';

/**
 * Helpers
 */
import { getMediaFiles, convertEntityToText } from './scripts/helpers';
import { pushMusicEventsToDatalayer, pushMusicViewEventsToDataLayer } from '@features/analytics';

const Playlist = () => {
    const [files, setFiles] = useState([]);

    // DOM references to the audio player, current track and current track index
    const trackRef = useRef(null);
    const trackIndexRef = useRef(0);
    const playerRef = useRef(null);

    // App states
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Used to force update the component
    // TODO: Find a better way to do this
    const [, setForceUpdate] = useState(Date.now());

    /**
     * Get audio files from the API
     * 
     */
    useEffect(() => {
        const getFiles = async () => {
            let files = await getMediaFiles({
                per_page: 25,
                media_type: 'audio',
            });

            await setFiles(files);

            trackRef.current = {
                id: 0,
                title: files[0].title.rendered,
                album: files[0].media_details?.album,
                artist: files[0].media_details?.artist,
                format: files[0].media_details?.fileformat,
                sampleRate: files[0].media_details?.sample_rate,
                src: files[0].source_url,
                duration: files[0].media_details?.length,
                durationFormatted: files[0].media_details?.length_formatted,
                featuredImage: {
                    src: files[0].metadata?.featured_image?.url,
                    alt: files[0].metadata?.featured_image?.alt,
                    height: files[0].metadata?.featured_image?.height,
                    width: files[0].metadata?.featured_image?.width,
                    title: files[0].metadata?.featured_image?.title
                }
            };

            setIsLoading(false);
        }

        getFiles();
    }, []);

    /**
     * Push music view events to dataLayer when the playlist is visible
     */
    const [playlistRef, isVisible] = usePlaylistOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    useEffect(() => {
        if (isVisible && files.length !== 0) pushMusicViewEventsToDataLayer(files);
    }, [isVisible, files]);

    /**
     * Set the current track
     * @return {void}
     */
    async function setCurrentTrack() {
        const audioPlayer = playerRef.current;

        const newTrack = await files.find((file, index) => {
            if (index === trackIndexRef.current) {
                return file;
            }
        });

        trackRef.current = {
            id: trackIndexRef.current,
            title: newTrack.title.rendered,
            album: newTrack.media_details?.album,
            artist: newTrack.media_details?.artist,
            format: newTrack.media_details?.fileformat,
            sampleRate: newTrack.media_details?.sample_rate,
            src: newTrack.source_url,
            duration: newTrack.media_details?.length,
            durationFormatted: newTrack.media_details?.length_formatted,
            featuredImage: {
                src: newTrack.metadata?.featured_image?.url,
                alt: newTrack.metadata?.featured_image?.alt,
                height: newTrack.metadata?.featured_image?.height,
                width: newTrack.metadata?.featured_image?.width,
                title: newTrack.metadata?.featured_image?.title
            }
        };

        /**
         * Force update the component and set focus on the new track
         */
        await setForceUpdate(Date.now());
        const track = document.querySelector(`.audio-player__list-item[aria-current="true"]`);
        track.focus();

        /**
         * Play the track
         */
        if (!isPlaying) return; // If a track is not currently playing, don't play the new one
        audioPlayer.play();
        setIsPlaying(true);
        pushMusicEventsToDatalayer(
            trackRef.current,
            audioPlayer.currentTime,
            'play'
        );
    }

    /**
     * Handle track change
     * @param {object} event
     * @param {object} meta
     * @return {void}
     */
    async function handleTrackChange(event, index, meta) {
        const audioPlayer = playerRef.current;
        const oldTrack = trackRef.current;

        /**
         * Set the trackRef to the new selected track
         */
        trackRef.current = meta;
        trackIndexRef.current = index;

        /**
         * Force update the component
         */
        await setForceUpdate(Date.now());

        /**
         * If user clicks song that is already playing, pause it
         */
        if (isPlaying && trackRef.current.id === oldTrack.id) {
            audioPlayer.pause();
            setIsPlaying(false);
            pushMusicEventsToDatalayer(
                trackRef.current,
                audioPlayer.currentTime,
                'pause'
            );
            return;
        }

        /**
         * Play the track
         */
        audioPlayer.play();
        setIsPlaying(true);

        /**
         * Send events to dataLayer (song, currentTime, status)
         */
        pushMusicEventsToDatalayer(
            trackRef.current,
            audioPlayer.currentTime,
            'play'
        );
    }

    /**
     * Handle keyboard input like 
     * - spacebar to play/pause
     * - arrow keys to navigate the playlist
     * @param {object} event
     * @return {void}
     */
    async function handleKeyboardInput(event) {
        const audioPlayer = playerRef.current;
        const activeElementID = parseInt(document.activeElement.dataset.id);

        /**
         * Toggle play
         */
        const togglePlay = async () => {
            if (isPlaying) {
                audioPlayer.pause();
                setIsPlaying(false);
                pushMusicEventsToDatalayer(
                    trackRef.current,
                    audioPlayer.currentTime,
                    'pause'
                );
            } else {
                audioPlayer.play();
                setIsPlaying(true);
                pushMusicEventsToDatalayer(
                    trackRef.current,
                    audioPlayer.currentTime,
                    'play'
                );
            }
        }

        /**
         * Move track index down
         */
        const moveDown = async () => {
            if (trackIndexRef.current === files.length - 1) {
                trackIndexRef.current = 0;
            } else {
                trackIndexRef.current = trackIndexRef.current + 1;
            }
        }

        /**
         * Move track index up
         */
        const moveUp = async () => {
            if (trackIndexRef.current === 0) {
                trackIndexRef.current = files.length - 1;
            } else {
                trackIndexRef.current = trackIndexRef.current - 1;
            }
        }

        /**
         * Handle keyboard input
         */
        switch (event.key) {
            case ' ':
                if (activeElementID === trackIndexRef.current) {
                    togglePlay();
                } else {
                    trackIndexRef.current = activeElementID;
                    const newTrack = await files.find((file, index) => {
                        if (activeElementID === index) {
                            return file;
                        }
                    });

                    trackRef.current = {
                        id: trackIndexRef.current,
                        title: newTrack.title.rendered,
                        album: newTrack.media_details?.album,
                        artist: newTrack.media_details?.artist,
                        format: newTrack.media_details?.fileformat,
                        sampleRate: newTrack.media_details?.sample_rate,
                        src: newTrack.source_url,
                        duration: newTrack.media_details?.length,
                        durationFormatted: newTrack.media_details?.length_formatted,
                        featuredImage: {
                            src: newTrack.metadata?.featured_image?.url,
                            alt: newTrack.metadata?.featured_image?.alt,
                            height: newTrack.metadata?.featured_image?.height,
                            width: newTrack.metadata?.featured_image?.width,
                            title: newTrack.metadata?.featured_image?.title
                        }
                    };

                    // Force update DOM
                    await setForceUpdate(Date.now());

                    // Play the track
                    playerRef.current.play();
                    setIsPlaying(true);
                    pushMusicEventsToDatalayer(
                        trackRef.current,
                        audioPlayer.currentTime,
                        'play'
                    );
                }
                break;
            case 'ArrowDown':
                if (event.target.tagName === 'LI') event.preventDefault();
                await moveDown();
                setCurrentTrack();

                break;
            case 'ArrowUp':
                if (event.target.tagName === 'LI') event.preventDefault();
                await moveUp();
                setCurrentTrack();

                break;
            default:
                break;
        }

        /**
         * Force update the component
         */
        await setForceUpdate(Date.now());
    }


    /**
     * Render the component
     */
    return (
        <>
            <PlayerContext.Provider value={{ isPlaying, setIsPlaying }}>
                {isLoading && <div>{__('Loading...', 'kotisivu-block-theme')}</div>}
                {!isLoading &&
                    <>
                        <AudioPlayer playerRef={playerRef} trackRef={trackRef} />
                        <ol
                            ref={playlistRef}
                            className="audio-player__list"
                            aria-label={__('Playlist', 'kotisivu-block-theme')}
                            role="list"
                            onKeyDown={(e) => handleKeyboardInput(e)}
                        >
                            {files.map((file, index) => {
                                const meta = {
                                    id: index,
                                    title: file.title.rendered,
                                    album: file.media_details?.album,
                                    artist: file.media_details?.artist,
                                    format: file.media_details?.fileformat,
                                    sampleRate: file.media_details?.sample_rate,
                                    src: file.source_url,
                                    duration: file.media_details?.length,
                                    durationFormatted: file.media_details?.length_formatted,
                                    featuredImage: {
                                        src: file.metadata?.featured_image?.url,
                                        alt: file.metadata?.featured_image?.alt,
                                        height: file.metadata?.featured_image?.height,
                                        width: file.metadata?.featured_image?.width,
                                        title: file.metadata?.featured_image?.title
                                    }
                                }

                                return (
                                    <li
                                        key={meta.id}
                                        className="audio-player__list-item"
                                        role="listItem"
                                        onClick={(event) => handleTrackChange(event, index, meta)}
                                        data-id={meta.id}
                                        data-src={meta.src}
                                        data-album={meta.album}
                                        data-artist={meta.artist}
                                        data-format={meta.format}
                                        data-samplerate={meta.sampleRate}
                                        aria-label={`${__('Play song', 'kotisivu-block-theme')} ${index + 1} ${__('of', 'kotisivu-block-theme')} ${files.length} ${__('in playlist', 'kotisivu-block-theme')}`}
                                        aria-current={trackIndexRef.current === index ? 'true' : 'false'}
                                        tabIndex="0"
                                    >
                                        <span className="audio-player__list-item-text">{convertEntityToText(meta.title)}</span>
                                        {!meta.featuredImage.src ? <Placeholder /> : (
                                            <img
                                                className="audio-player__list-item-image"
                                                aria-hidden="true"
                                                src={meta.featuredImage.src}
                                                alt={meta.featuredImage.alt}
                                                height={meta.featuredImage.height}
                                                width={meta.featuredImage.width}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </>
                }
            </PlayerContext.Provider>
        </>
    );
};

domReady(async function () {
    createRoot(
        document.getElementById('audio-player')).render(<Playlist />
        );
});
