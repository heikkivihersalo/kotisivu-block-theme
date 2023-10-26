const CircleOutline = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 500 500"
		{...props}
	>
		<path
			d="M249.999 0c137.978 0 250 112.021 250 249.999s-112.022 250-250 250-250-112.022-250-250 112.022-250 250-250Zm0 30c-121.421 0-220 98.578-220 219.999 0 121.421 98.579 220 220 220s220-98.579 220-220-98.579-220-220-220Z"
			fill="var(--wp--preset--color--black)"
		/>
	</svg>
);
export { CircleOutline };
