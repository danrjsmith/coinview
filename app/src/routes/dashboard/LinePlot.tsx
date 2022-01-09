import React from "react";
import { LineSeries, LineSeriesPoint, XYPlot } from "react-vis";
import { theme } from "../../theme";

interface LinePlotProps {
  data: LineSeriesPoint[];
}

export function LinePlot({ data }: LinePlotProps) {
  return (
    <XYPlot height={110} width={210}>
      <LineSeries
        curve="curveBasis"
        opacity={1}
        data={data}
        stroke={theme.palette.primary.contrastText}
        strokeStyle="solid"
        style={{}}
      />
    </XYPlot>
  );
}
