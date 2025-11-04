import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MonitoringChart = ({ data }) => {
  const formattedData = data.map((d) => ({
    time: new Date(d.created_at).toLocaleTimeString(),
    metric: d.metric_name,
    value: d.metric_value,
  }));

  return (
    <div>
      <h2>📈 System Metrics</h2>
      <LineChart width={700} height={280} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" name="Metric Value" />
      </LineChart>
    </div>
  );
};

export default MonitoringChart;
