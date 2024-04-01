/**
 * Helper function to check the status of the song
 * @param {String} status - status of the song (play, pause, complete)
 * @returns { String } - status of the song (play, pause, complete, undefined)
 */
const checkSongStatus = async (status) => {
    const VALID_STATUSES = ['play', 'pause', 'complete', 'seek', 'stream'];
    return VALID_STATUSES.includes(status) ? status : 'undefined';
}

/**
 * Helper function to format song object
 * @param {Object} song - song object
 * @returns {Object} - formatted song object
 */
const formatSong = async ({ id, title, artist, album, sampleRate, format }) => {
    return {
        id,
        title,
        artist,
        album,
        meta: {
            sampleRate,
            format,
        }
    }
}

/**
 * Helper function to get the percent range of the song
 * @param {Number} currentTime - current time of the song
 * @param {Number} duration - duration of the song
 * @returns {String} - percent range of the song
 */
const getPercentRange = (currentTime, duration) => {
    const percent = Math.round((currentTime / duration) * 100);
    const ranges = {
        '0': 15,
        '15': 25,
        '25': 50,
        '50': 75,
        '75': 100
    };

    for (let range in ranges) {
        if (percent <= ranges[range]) {
            return range;
        }
    }
}

/**
 * Helper function to format track list
 * @param {Array} tracks - track list
 * @returns {Array} - formatted track list
 */
const formatTrackList = async (tracks) => {
    return tracks.map((track, index) => ({
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
    }));
}

/**
 * Push music events (play, pause etc.) to dataLayer
 * @param {Object} song - song object
 * @param {Number} currentTime - current time of the song
 * @param {String} status - status of the song (play, pause, complete)
 * @returns { void }
 */
async function pushMusicEventsToDatalayer(song, currentTime, status) {
    const songStatus = await checkSongStatus(status);
    const songPercent = await getPercentRange(currentTime, song?.duration);
    const songData = await formatSong(song);
    const timeData = {
        current: Math.round(currentTime),
        duration: song?.duration,
        percent: Math.round((currentTime / song?.duration) * 100)
    };

    window.dataLayer = window.dataLayer || [];

    if (songStatus !== 'seek' && songStatus !== 'stream') {
        window.dataLayer.push({
            event: `music_${songStatus}`,
            song: songData,
            time: timeData
        });
    }

    window.dataLayer.push({
        event: `music_${status}_${songPercent}`,
        song: songData,
        time: timeData
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