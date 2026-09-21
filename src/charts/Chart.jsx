import React from "react";
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { barY, lineY, defineChart } from '@tanstack/charts';
import { pie, polar, radialArc, radialBarAngle } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
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
          case ChartType.DONUT:
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
                        innerRadius: ({ radius }) => radius * 0.58,
                    }),
                ]
            });
            break;
          case ChartType.RADIAL:
            const maxData = Math.max(...data.map((d) => d.value));
            console.log(maxData);
            chartData = polar({
                scales: {
                  angle: {
                    scale: scaleLinear().domain([0, maxData]),
                  },
                  radius: {
                    scale: () =>
                      scaleBand().paddingInner(0.38).paddingOuter(0.19),
                    range: [
                      ({ radius }) => radius * 0.2,
                      ({ radius }) => radius,
                    ],
                  },
                },
                
                marks: [
                    radialBarAngle(
                      data,
                      {
                        angle: 'value',
                        radius: 'label',
                        key: 'label',
                        color: 'label',
                        cornerRadius: 'full'
                      }
                    ),
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