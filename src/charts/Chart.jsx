import React from "react";
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { barY, lineY, defineChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart as TanstackChart } from '@tanstack/charts/react';
import ChartType from './ChartType';
const Chart = ({data, chartType}) => {
    var chartData = null;
    switch (chartType) {
        case ChartType.BAR:
            chartData = barY(data, {
                x: 'label',
                y: 'value',
            });
            break;
        case ChartType.LINE:
            chartData = lineY(data, {
                x: 'label',
                y: 'value',
            });
            break;
        case ChartType.PIE:
            chartData = polar({
                scales: {
                    angle: null,
                    radius: null,
                },
                marks: [
                    radialArc(pie(data, {
                        value: 'value',
                        }),{
                        key: 'label',
                        color: 'label',
                    }),
                ]
            });
            break;
        default:
            chartData = null;
    }
  const chart = defineChart({
  marks: [
    chartData
  ],
  scales: {
    x: {
      scale: () => scaleBand().padding(0.18),
    },
    y: {
      scale: scaleLinear,
      nice: true,
      grid: true,
      axis: {
        label: 'Frequency',
        ticks: { format: (value) => value + '%' },
      },
    },
  },

  tooltip,
})

  return (
    <TanstackChart
      definition={chart}
      height={320}
      ariaLabel="English letter frequencies"
    />
  );
};

export default Chart;