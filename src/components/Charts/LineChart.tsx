import React, { CanvasHTMLAttributes, Component, createRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Chart from "chart.js";

interface IProps {
	logData: any;
	extractName: string;
}

const LineChart: React.FC<IProps> = ({logData, extractName}: IProps) => {
	let chartRef = createRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = document.getElementById(`chart` + extractName) as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		var gradientStroke = ctx.createLinearGradient(chartRef.current.width / 2, 0, chartRef.current.width / 2, chartRef.current.height);
		gradientStroke.addColorStop(0, 'rgba(255, 255, 255, 0.075)');

		gradientStroke.addColorStop(0.63, 'rgba(24, 26, 27, 0)');

		const data: Chart.ChartData = {
			labels: logData && logData.map(item => item.day),
			datasets: [
				{
					label: extractName,
					fill: true,
					lineTension: 0.1,
					backgroundColor: gradientStroke,
					borderColor: 'rgba(150, 150, 150, 1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(150, 150, 150, 1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(150, 150, 150, 1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: logData && logData.map(item => item[extractName])
				}
			]
		};

		const options: Chart.ChartOptions = {
			responsive: true,
			aspectRatio: 1,
			animation: {
				duration: 0,
			},
			maintainAspectRatio: false,
			legend: {
				display: false,
					labels: {
					}
			},
			layout: {
				padding: {
						top: 5,
						bottom: 5,
				}
			},
			scales: {
				yAxes: [{
					display: false,
					gridLines: {
						display: false ,
						color: "#FFFFFF"
					},
					ticks: {
							beginAtZero: false,
							fontColor: '#747676',
							fontFamily: 'Poppins',
							fontSize: 6,
					},
				}],
				xAxes: [{
					display: false,
					gridLines: {
						display: false ,
						color: "#FFFFFF"
					},
					ticks: {
							fontColor: '#747676',
							fontFamily: 'Poppins',
							fontSize: 6
					},
				}]
			}
		}

		new Chart(ctx, {
				type: "line",
				data: data,
				options: options
		});
	}, [chartRef])

	return (
		<canvas
			id={`chart` + extractName}
			ref={chartRef}
		/>
	)
}

export default LineChart;
