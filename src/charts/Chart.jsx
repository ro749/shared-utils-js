import React from "react";
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { barY, areaY, lineY, defineChart } from '@tanstack/charts';
import { pie, polar, radialArc, radialBarAngle } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { Chart as TanstackChart } from '@tanstack/charts/react';
import ChartType from './ChartType';
const Chart = ({chart, type, guides=false, width, height, color, gradient}) => {
    console.log(chart);
    var chartData = null;
    switch (type) {
        case ChartType.BAR:
            chartData = barY(chart.data, {
                x: chart.label_column,
                y: chart.data_column,
            });
            break;
        case ChartType.LINE:
            chartData = lineY(chart.data, {
              x: chart.label_column,
              y: chart.data_column,
              stroke: color,
            });
            break;
        case ChartType.PIE:
            chartData = polar({
                scales: {
                    angle: null,
                    radius: null,
                },
                marks: [
                    radialArc(pie(chart.data, {
                        value: chart.data_column,
                        }),{
                        key: chart.label_column,
                        color: chart.label_column,
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
                    radialArc(pie(chart.data, {
                        value: chart.data_column,
                        }),{
                        key: chart.label_column,
                        color: chart.label_column,
                        innerRadius: ({ radius }) => radius * 0.58,
                    }),
                ]
            });
            break;
          case ChartType.RADIAL:
            const maxData = Math.max(...chart.data.map((d) => d[chart.data_column]));
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
                      chart.data,
                      {
                        angle: chart.data_column,
                        radius: chart.label_column,
                        key: chart.label_column,
                        color: chart.label_column,
                        cornerRadius: 'full'
                      }
                    ),
                ]
            });
            break;
        default:
            chartData = null;
  }
  var marks = [chartData];
  var gradients = [];
  if (gradient) {
    marks.push(areaY(chart.data, {
      x: chart.label_column,
      y: chart.data_column,
      stroke: color,
    }));
    //gradients = [
    //  {
    //    id: 'themed-area-fill',
    //    x1: 0,
    //    y1: 0,
    //    x2: 0,
    //    y2: 1,
    //    stops: [
    //      { offset: 0, color: accent, opacity: 0.34 },
    //      { offset: 0.58, color: accent, opacity: 0.13 },
    //      { offset: 1, color: accent, opacity: 0.015 },
    //    ],
    //  },
    //];
  }
  const chartDef = defineChart({
  marks: marks,
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
  guides: guides,
  gradients: gradients,
  tooltip,
})

  return (
    <TanstackChart
      definition={chartDef}
      width={width}
      height={height}
      ariaLabel=""
    />
  );
};

export default Chart;
