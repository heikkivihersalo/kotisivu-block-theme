/**
 * Helper function to check the status of the song
 * @param {String} status - status of the song (play, pause, complete)
 * @returns { String } - status of the song (play, pause, complete, undefined)
 */
const checkSongStatus = async (status) => {
    const STATUS_MAP = {
        PLAY: 'play',
        PAUSE: 'pause',
        COMPLETE: 'complete',
        SEEK: 'seek',
        STREAM: 'stream'
    };

    for (let key in STATUS_MAP) {
        if (STATUS_MAP[key] === status) {
            return STATUS_MAP[key];
        }
    }

    return 'undefined'; // if status is not valid, set it to undefined
}

/**
 * Helper function to format song object
 * @param {Object} song - song object
 * @returns {Object} - formatted song object
 */
const formatSong = async (song) => {
    return {
        id: song?.id,
        title: song?.title,
        artist: song?.artist,
        album: song?.album,
        meta: {
            sampleRate: song?.sampleRate,
            format: song?.format,
        }
    }
}

/**
 * Helper function to get the percent range of the song
 * @param {Number} currentTime - current time of the song
 * @param {Number} duration - duration of the song
 * @returns {String} - percent range of the song
 */
const getPercentRange = async (currentTime, duration) => {
    const percent = Math.round((currentTime / duration) * 100);

    if (percent <= 15) {
        return '0';
    } else if (percent >= 15 && percent <= 25) {
        return '15';
    } else if (percent > 25 && percent <= 50) {
        return '25';
    } else if (percent > 50 && percent <= 75) {
        return '50';
    } else if (percent > 75 && percent <= 100) {
        return '75';
    }
}

/**
 * Helper function to format track list
 * @param {Array} tracks - track list
 * @returns {Array} - formatted track list
 */
const formatTrackList = async (tracks) => {
    return tracks.map((track, index) => {
        return {
            id: index,
            title: track?.title.rendered,
            artist: track?.media_details?.artist,
            album: track?.media_details?.album,
            meta: {
                sampleRate: track?.media_details?.sample_rate,
                format: track?.media_details?.fileformat,
            },
            time: {
                duration: track?.media_details?.length,
                durationFormatted: track?.media_details?.length_formatted
            }
        }
    });
}

/**
 * Push music events (play, pause etc.) to dataLayer
 * @param {Object} song - song object
 * @param {Number} currentTime - current time of the song
 * @param {String} status - status of the song (play, pause, complete)
 * @returns { void }
 */
async function pushMusicEventsToDatalayer(song, currentTime, status) {
    /**
     * Check if status is valid
     */
    const songStatus = await checkSongStatus(status);
    const songPercent = await getPercentRange(currentTime, song?.duration);
    const songData = await formatSong(song);

    /**
     * Push data to dataLayer
     * If song status is seek or stream, don't push the event
     */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: `music_${songStatus}`,
        song: songData,
        time: {
            current: Math.round(currentTime),
            duration: song?.duration,
            percent: Math.round((currentTime / song?.duration) * 100)
        }
    });

    /**
     * Push data to dataLayer
     */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: `music_${status}_${songPercent}`,
        song: songData,
        time: {
            current: Math.round(currentTime),
            duration: song?.duration,
            percent: Math.round((currentTime / song?.duration) * 100)
        }
    });
}


/**
 * Push music view events to dataLayer
 * @param {Array} tracks - track list
 * @returns { void }
 */
async function pushMusicViewEventsToDataLayer(tracks) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'music_view_tracks',
        songs: await formatTrackList(tracks)
    });
}

export { pushMusicEventsToDatalayer, pushMusicViewEventsToDataLayer }