

export { bomb_row_svg, bomb_panel, bomb_red, bomb_yellow, bomb_green };

const bomb_row_svg = String.raw`<rect class="bomb-row__wall" fill="#2980B9" width="450" height="100"/>
<rect class="bomb-row__floor" x="19" y="11" fill="#3498DB" width="416" height="80"/>
<g class="bomb-row__border">
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="432.891" y1="12.5" x2="450" y2="0"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="434.666" y1="90.584" x2="450" y2="100"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="19.542" y1="11.458" x2="0" y2="0"/>
	<line fill="none" stroke="#3498DB" stroke-linecap="round" stroke-miterlimit="10" x1="19.5" y1="90.417" x2="0" y2="100"/>
</g>
<g class="bomb-row__arrow">
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="212.5" y1="77.5" x2="237.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="237.5" y1="52.5" x2="212.5" y2="27.5"/>
	</g>
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="182.5" y1="77.5" x2="207.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="207.5" y1="52.5" x2="182.5" y2="27.5"/>
	</g>
	<g>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="242.5" y1="77.5" x2="267.5" y2="52.5"/>
		
			<line fill="none" stroke="#2980b9" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="267.5" y1="52.5" x2="242.5" y2="27.5"/>
	</g>
</g>`;




const bomb_panel = String.raw`<rect class="button__panel__bg" fill="#3498db" width="50" height="100"/>
<g class="bomb__red">
	<path class="button__red2" fill="#C0392B" d="M44,23.5c0,4.142-3.357,7.5-7.5,7.5h-23C9.357,31,6,27.642,6,23.5v-10
		C6,9.358,9.357,6,13.5,6h23c4.143,0,7.5,3.358,7.5,7.5V23.5z"/>
	<g class="button__red--surface">
		<path class="button__red" fill="#E74C3C" d="M44,21.5c0,4.142-3.357,7.5-7.5,7.5h-23C9.357,29,6,25.642,6,21.5v-10
			C6,7.358,9.357,4,13.5,4h23c4.143,0,7.5,3.358,7.5,7.5V21.5z"/>
		<g class="bomb__icon_2_">
			<circle fill="#FFFFFF" cx="24.924" cy="16.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,9.162l-1.031,1.031c0.671,0.442,1.263,0.994,1.755,1.628l0.967-0.968
				C31.585,10.2,31.015,9.629,30.362,9.162z"/>
			<path fill="#FFFFFF" d="M32.363,8.488l-1.085,1.084c0.202,0.174,0.391,0.361,0.571,0.556l1.062-1.061
				C32.731,8.871,32.549,8.677,32.363,8.488z"/>
		</g>
	</g>
</g>
<g class="bomb__yellow">
	<path class="button__orange2" fill="#E67E22" d="M44,56.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,64,6,60.643,6,56.5v-10
		c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V56.5z"/>
	<g class="button__yellow--surface">
		<path class="button__orange" fill="#F39C12" d="M44,54.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,62,6,58.643,6,54.5v-10
			c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V54.5z"/>
		<g class="bomb__icon_1_">
			<circle fill="#FFFFFF" cx="24.924" cy="49.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,42.162l-1.031,1.031c0.671,0.442,1.263,0.994,1.755,1.628l0.967-0.968
				C31.585,43.2,31.015,42.629,30.362,42.162z"/>
			<path fill="#FFFFFF" d="M32.363,41.488l-1.085,1.084c0.202,0.174,0.391,0.361,0.571,0.556l1.062-1.061
				C32.731,41.871,32.549,41.677,32.363,41.488z"/>
		</g>
	</g>
</g>
<g class="bomb__green">
	<path class="button__green2" fill="#27AE60" d="M44,90.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,98,6,94.643,6,90.5v-10
		c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V90.5z"/>
	<g class="button__green--surface">
		<path class="button__green" fill="#2ECC71" d="M44,88.5c0,4.143-3.357,7.5-7.5,7.5h-23C9.357,96,6,92.643,6,88.5v-10
			c0-4.143,3.357-7.5,7.5-7.5h23c4.143,0,7.5,3.357,7.5,7.5V88.5z"/>
		<g class="bomb__icon">
			<circle fill="#FFFFFF" cx="24.924" cy="83.291" r="7.299"/>
			<path fill="#FFFFFF" d="M30.362,76.162l-1.031,1.031c0.671,0.441,1.263,0.994,1.755,1.627l0.967-0.967
				C31.585,77.2,31.015,76.629,30.362,76.162z"/>
			<path fill="#FFFFFF" d="M32.363,75.488l-1.085,1.084c0.202,0.174,0.391,0.36,0.571,0.555l1.062-1.061
				C32.731,75.871,32.549,75.678,32.363,75.488z"/>
		</g>
	</g>
</g>`;



const bomb_green = String.raw`<circle fill="#2ECC71" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#2ECC71" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#2ECC71" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;

const bomb_yellow = String.raw`<circle fill="#F1C40F" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#F1C40F" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#F1C40F" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;

const bomb_red = String.raw`<circle fill="#E74C3C" cx="24.13" cy="50.81" r="23.505"/>
<path fill="#E74C3C" d="M41.64,27.854l-3.32,3.32c2.163,1.425,4.066,3.202,5.65,5.242l3.116-3.116
	C45.58,31.199,43.741,29.36,41.64,27.854z"/>
<path fill="#E74C3C" d="M48.084,25.685l-3.492,3.491c0.647,0.561,1.257,1.162,1.84,1.789l3.417-3.417
	C49.267,26.919,48.682,26.294,48.084,25.685z"/>`;
