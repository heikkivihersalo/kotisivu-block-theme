const ArrowLeft = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 1000 1000"
		{...props}
	>
		<path
			d="M500 0c275.958 0 500 224.042 500 500 0 275.958-224.042 500-500 500C224.042 1000 0 775.958 0 500 0 224.042 224.042 0 500 0Zm264 500L336 209.5v581L764 500Z"
			style={{
				fill: "var(--wp--preset--color--primary), black",
			}}
			transform="rotate(180 500 500)"
		/>
	</svg>
);
export { ArrowLeft };
