/**
 * Email icon
 * @param {SvgIcon} props Icon properties
 * @param {string} props.className Class name
 * @param {string} props.fill Fill color
 * @return {JSX.Element} SVG icon
 */
function Email(props: CustomSVGProps): JSX.Element {
	return (
		<div
			className="is-square-icon"
			style={{
				backgroundColor: 'var(--wp--preset--color--secondary)',
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 512 512"
				className={props.className || undefined}
			>
				<path
					d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
					style={{
						fill: props.fill || 'var(--wp--preset--color--white)',
					}}
				/>
			</svg>
		</div>
	);
}

export { Email };
