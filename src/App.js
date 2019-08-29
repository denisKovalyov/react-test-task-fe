import React from 'react';
import { CSSTransition } from 'react-transition-group';
import io from 'socket.io-client';
import convertTime from './utils/convert-time';
import calculateIndex from './utils/calculate-index';

import Input from './Input';
import SnackBar from './SnackBar';
import LineChart from './LineChart';
import lineChartConfig from './LineChart/config';
import BarChart from './BarChart';
import barChartConfig from './BarChart/config';

class App extends React.Component {
	constructor() {
		super();

		this.snackbarTransDuration = 300;
		
		this.state = {
			response: false,
			endpoint: 'http://127.0.0.1:3000',
			lineChartData: {
				labels: [],
				datasets: lineChartConfig,
			},
			barChartData: barChartConfig,
			userValue: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = io(endpoint);

		socket.on('data', data => {
			const { lineChartData, barChartData } = this.state;
			
			//console.log(lineChartData)
			const updatedLineChart = {
				labels: [...lineChartData.labels, convertTime(data.timestamp)],
				datasets: [{
					...lineChartData.datasets[0],
					data: [...lineChartData.datasets[0].data, data.value],
				}]
			};

			//console.log(barChartData)
			const updatedRangeNumber = [...barChartData.datasets[0].data];
			const RANGE_STEP = 25;
			updatedRangeNumber[calculateIndex(data.value, RANGE_STEP)]++;

			const updatedBarChart = {
				...barChartData.labels,
				datasets: [{
					...barChartData.datasets[0],
					data: updatedRangeNumber,
				}]
			};

			this.setState({ 
				response: data,
				lineChartData: updatedLineChart,
				barChartData: updatedBarChart,
			});
		});
	}

	handleChange(e) {
		this.setState({ userValue: e.target.value });
	}

	render() {
		const { response, lineChartData, barChartData, userValue } = this.state;
		const showSnackBar = Boolean(userValue && userValue < response.value);

		return (
				<React.Fragment>
					<LineChart data={lineChartData} />

					<BarChart data={barChartData} />

					<Input
						label="Alert threshold"
						type="number"
						min="-100"
						max="100"
						step="1"
						id="threshold"
						value={userValue}
						onChange={this.handleChange}
					/>

					<CSSTransition
						in={showSnackBar}
						classNames="fade"
						timeout={this.snackbarTransDuration}
						unmountOnExit
					>
						<SnackBar
							value={response.value}
						/>
					</CSSTransition>
				</React.Fragment>
		);
	}
}

export default App;
