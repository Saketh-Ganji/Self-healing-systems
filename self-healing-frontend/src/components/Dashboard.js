import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import MonitoringChart from "./MonitoringChart";
import AlertsTable from "./AlertsTable";
import LogsTable from "./LogsTable";

const Dashboard = () => {
  const [monitoring, setMonitoring] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const mon = await axios.get("http://localhost:5000/monitoring");
      const al = await axios.get("http://localhost:5000/alerts");
      const lg = await axios.get("http://localhost:5000/logs");

      setMonitoring(mon.data);
      setAlerts(al.data);
      setLogs(lg.data);
      setLoading(false);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LinearProgress color="primary" />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: "0 0 15px rgba(144, 202, 249, 0.3)",
            border: "1px solid rgba(144, 202, 249, 0.2)",
            background: "linear-gradient(145deg, #0e1621, #1a202c)",
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              📊 System Metrics
            </Typography>
            <MonitoringChart data={monitoring} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card
          sx={{
            boxShadow: "0 0 12px rgba(244, 143, 177, 0.3)",
            border: "1px solid rgba(244, 143, 177, 0.2)",
            background: "linear-gradient(145deg, #0e1621, #1a202c)",
          }}
        >
          <CardContent>
            <AlertsTable alerts={alerts} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card
          sx={{
            boxShadow: "0 0 12px rgba(144, 202, 249, 0.3)",
            border: "1px solid rgba(144, 202, 249, 0.2)",
            background: "linear-gradient(145deg, #0e1621, #1a202c)",
          }}
        >
          <CardContent>
            <LogsTable logs={logs} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
