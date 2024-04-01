const CircleFilled = (props) => (
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
		<circle
            fill="var(--wp--preset--color--black)"
			cx={280}
			cy={276}
			r={220}
			transform="translate(-68.182 -63.636) scale(1.13636)"
		/>
	</svg>
);
export { CircleFilled };
