import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip,
} from "@mui/material";

const getColor = (severity) => {
  switch (severity) {
    case "CRITICAL": return "error";
    case "HIGH": return "warning";
    case "MEDIUM": return "info";
    default: return "success";
  }
};

const AlertsTable = ({ alerts }) => (
  <>
    <Typography variant="h6" gutterBottom color="secondary">
      🚨 Active Alerts
    </Typography>
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "rgba(22,27,34,0.8)", borderRadius: 2 }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Incident Type</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.id}</TableCell>
              <TableCell>{a.incident_type}</TableCell>
              <TableCell>
                <Chip
                  label={a.severity}
                  color={getColor(a.severity)}
                  sx={{ fontWeight: "bold" }}
                />
              </TableCell>
              <TableCell>{a.description}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>{new Date(a.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default AlertsTable;
