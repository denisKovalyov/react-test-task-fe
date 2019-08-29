export default {
	labels: ['-100 - -75', '-75 - -50', '-50 - -25', '-25 - 0', '0 - 25', '25 - 50', '50 - 75', '75 - 100'],
	datasets: [
		{
			label: 'Bar Chart',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: Array(8).fill(0),
		}
	]
};
