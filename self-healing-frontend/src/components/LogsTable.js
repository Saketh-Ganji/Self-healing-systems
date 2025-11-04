import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from "@mui/material";

const LogsTable = ({ logs }) => (
  <>
    <Typography variant="h6" gutterBottom>
      🧾 System Logs
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Service Name</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((l) => (
            <TableRow key={l.id}>
              <TableCell>{l.id}</TableCell>
              <TableCell>{l.service_name}</TableCell>
              <TableCell>{l.log_level}</TableCell>
              <TableCell>{l.message}</TableCell>
              <TableCell>{new Date(l.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default LogsTable;
