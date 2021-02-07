import React, { CanvasHTMLAttributes, Component, createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Chart from "chart.js";

interface IProps {
	logData: any;
	extractName: string;
	baseColor: string;
}

const LineChart: React.FC<IProps> = ({logData, extractName, baseColor}: IProps) => {
	let chartRef = createRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = document.getElementById(`chart` + extractName) as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		var gradientStroke = ctx.createLinearGradient(chartRef.current.width / 2, 0, chartRef.current.width / 2, chartRef.current.height);
		gradientStroke.addColorStop(0, baseColor);

		gradientStroke.addColorStop(0.63, 'rgba(24, 26, 27, 0)');

		const data: Chart.ChartData = {
			labels: logData && logData.map(item => item.day),
			datasets: [
				{
					label: extractName,
					fill: true,
					lineTension: 0.1,
					backgroundColor: gradientStroke,
					borderColor: baseColor,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: baseColor,
					pointBackgroundColor: baseColor,
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: '#f2f2f2',
					pointHoverBorderColor: baseColor,
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
					display: true,
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
					display: true,
					gridLines: {
						display: false ,
						color: "#FFFFFF"
					},
					ticks: {
							maxTicksLimit: 15,
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
	}, [chartRef]);

	return (
		<canvas
			id={`chart` + extractName}
			ref={chartRef}
		/>
	)
}

export default LineChart;
