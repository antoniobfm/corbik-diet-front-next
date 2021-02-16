import React, { CanvasHTMLAttributes, Component, createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import Chart from "chart.js";

interface IDatasets {
	extractName: string;
	baseColor: string;
}

interface IProps {
	name: string;
	logData: any;
	datasets: IDatasets[];
}

const LineChart: React.FC<IProps> = ({logData, datasets, name}: IProps) => {
	let chartRef = createRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = document.getElementById(`chart` + name) as HTMLCanvasElement;
		const ctx = canvas.getContext("2d");
		// var gradientStroke = ctx.createLinearGradient(chartRef.current.width / 2, 0, chartRef.current.width / 2, chartRef.current.height);
		// gradientStroke.addColorStop(0, baseColor);

		// gradientStroke.addColorStop(0.63, "rgba(24, 26, 27, 0)");

		const teste = datasets.map(item => {
			const tururu =
			{
				label: item.extractName,
				fill: true,
				lineTension: 0.1,
				backgroundColor: "transparent",
				borderColor: item.baseColor,
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: item.baseColor,
				pointBackgroundColor: item.baseColor,
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "#f2f2f2",
				pointHoverBorderColor: item.baseColor,
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: logData && logData.map(item2 => item2[item.extractName])
			};
			return tururu;
		})

		const data: Chart.ChartData = {
			labels: logData && logData.map(item => item.day),
			datasets: teste
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
							fontColor: "#747676",
							fontFamily: "Poppins",
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
							fontColor: "#747676",
							fontFamily: "Poppins",
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
			id={`chart` + name}
			ref={chartRef}
		/>
	)
}

export default LineChart;
