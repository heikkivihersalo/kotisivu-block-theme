import { __ } from "@wordpress/i18n";
import { useState, useContext } from "@wordpress/element";

import { PlayButton, StopButton, Placeholder } from "../icons";

import PlayerContext from "../context/PlayerContext";
import { pushMusicEventsToDatalayer } from '@features/analytics';

/**
 * Audio player component
 *
 * @param {*} { id, title, src, album, artist, format, sampleRate }
 * @return {*}
 */
const AudioPlayer = ({ playerRef, trackRef }) => {
	const { isPlaying, setIsPlaying } = useContext(PlayerContext);
	const [mediaTime, setMediaTime] = useState(0);
	const [mediaDuration, setMediaDuration] = useState(0);

	/**
	 * Converts seconds to a time stamp (mm:ss)
	 *
	 * @param {Number} seconds
	 * @return {String} Time stamp
	 */
	function timeStamp(seconds) {
		const minutes = Math.floor(seconds / 60);
		const secondsLeft = seconds - minutes * 60;

		return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
	}

	/**
	 * Toggles the playing state of the audio player
	 * @param {Object} event
	 * @return {Void}
	 */
	async function togglePlaying(event) {
		await setIsPlaying(!isPlaying);

		const audioPlayer = playerRef.current;

		if ( isPlaying ) {
			audioPlayer.pause();
            pushMusicEventsToDatalayer(
                trackRef.current,
                audioPlayer.currentTime,
                'pause'
            );
		} else {
			audioPlayer.play();
			pushMusicEventsToDatalayer(
                trackRef.current,
                audioPlayer.currentTime,
                'play'
            );
		}
	}

	/**
	 * Sets the media duration
	 * @return {Void}
	 */
	async function onLoadedMetadata() {
		await setMediaDuration(Math.round(playerRef.current.duration));
	}

	/**
	 * Sets the media time
	 * @return {Void}
	 */
	async function onTimeUpdate() {
		await setMediaTime(Math.round(playerRef.current.currentTime));
	}

	/**
	 * Handles the change of the audio timeline
	 * @param {Object} event
	 * @return {Void}
	 */

	async function handleAudioTimelineChange(event) {
		const playhead = parseFloat(event.target.value);
		await setMediaTime(playhead);
		playerRef.current.currentTime = playhead;
	}

	/**
	 * Return the audio player
	 */
	return (
		<>
			<div className="audio-player" tabIndex="-1" aria-hidden="true">
				<div className="audio-player__info">
					<button
						className="audio-player__btn audio-player__btn--play"
						data-state={isPlaying ? "pause" : "play"}
						onClick={togglePlaying}
						tabIndex={-1}
						aria-hidden="true"
					>
						<span className="is-visually-hidden">
							{isPlaying
								? __("Pause", "kotisivu-block-theme")
								: __("Play", "kotisivu-block-theme")}
						</span>
						{isPlaying ? <StopButton /> : <PlayButton />}
					</button>
					<div className="audio-player__track-details">
						<div className="audio-player__now-playing">
							<h3>{__("Now Playing", "kotisivu-block-theme")}</h3>
							<div className="audio-player__quality">
								<span className="audio-player__quality-item">
									{trackRef.current?.format}
								</span>
								<span className="audio-player__quality-item">
									{trackRef.current?.sampleRate}
								</span>
							</div>
						</div>
						<p className="audio-player__track-name">
							{!trackRef.current?.artist &&
								__("Loading...", "kotisivu-block-theme")}
							{trackRef.current?.artist && (
								<>
									<span className="audio-player__artist">
										{trackRef.current?.artist}
									</span>
									:{" "}
									<span className="audio-player__album">
										{trackRef.current?.album}
									</span>
								</>
							)}
						</p>
					</div>
					{!trackRef.current?.featuredImage ? (
						<Placeholder />
					) : (
						<img
							className="audio-player__cover"
							src={trackRef.current?.featuredImage.src}
							width={trackRef.current?.featuredImage.width}
							height={trackRef.current?.featuredImage.height}
							alt={trackRef.current?.featuredImage.alt}
						/>
					)}
				</div>
				<div className="audio-player__timeline">
					<div className="audio-player__timeline-elapsed">
						<span className="is-visually-hidden">
							{__("Elapsed Time", "kotisivu-block-theme")}
						</span>
						{timeStamp(mediaTime)}
					</div>
					<label htmlFor="audio-timeline" className="is-visually-hidden">
						{__("Timeline", "kotisivu-block-theme")}
					</label>
					<input
						type="range"
						id="audio-timeline"
						value={mediaTime}
						min={0}
						max={mediaDuration}
						onChange={handleAudioTimelineChange}
						aria-valuetext={`${mediaTime} seconds`}
						tabIndex={-1}
					/>
					<div className="audio-player__timeline-duration">
						<span className="is-visually-hidden">
							{__("Total Duration", "kotisivu-block-theme")}
						</span>
						{timeStamp(mediaDuration)}
					</div>
				</div>
			</div>
			<audio
				className="is-visually-hidden"
				controls
				ref={playerRef}
				src={trackRef.current?.src}
				onLoadedMetadata={onLoadedMetadata}
				onTimeUpdate={onTimeUpdate}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			/>
			<p className="is-visually-hidden">{`${__('Now playing song', 'kotisivu-block-theme')} ${trackRef.current?.album} ${__('from artist', 'kotisivu-block-theme')} ${trackRef.current?.artist}`}</p>
		</>
	);
};

export default AudioPlayer;
