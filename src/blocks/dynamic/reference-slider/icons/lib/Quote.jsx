const Quote = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
        width="100%"
        height="100%"
		viewBox="0 0 615 576"
		{...props}
	>
		<path
			d="M0 0h256l-44 576H42L0 0ZM359 0h256l-44 576H401L359 0Z"
			fill="var(--wp--preset--color--secondary)"
		/>
	</svg>
);
export { Quote };
