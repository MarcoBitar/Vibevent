import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './TrendChart.css';

// TrendChart renders a responsive line chart with labeled axes and tooltip
export default function TrendChart({ title, data, dataKey, color = '#8884d8' }) {
  return (
    <div className="trend-chart">
      <h4>{title}</h4>

      {/* Responsive container ensures chart scales with parent */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />         {/* dashed grid lines */}
          <XAxis dataKey="month" />                       {/* x-axis uses 'month' field */}
          <YAxis />                                       {/* auto-scaled y-axis */}
          <Tooltip />                                     {/* hover tooltip */}
          <Line
            type="monotone"                              // smooth curve
            dataKey={dataKey}                            // dynamic y-axis field
            stroke={color}                               // customizable line color
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}