const Placeholder = (props) => (
	<svg
		className="music-playlist__placeholder-image"
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		width={400}
		height={400}
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 400 400"
		{...props}
	>
		<path
			d="M0 0h400v400H0z"
			style={{
				fill: "#ebebeb",
			}}
		/>
	</svg>
);
export { Placeholder };
