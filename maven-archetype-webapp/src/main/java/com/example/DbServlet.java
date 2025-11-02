package com.example;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DbServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String url = "jdbc:mysql://localhost:3306/self_healing_db";
        String username = "root";  // Change if your MySQL has password
        String password = "Saki@1704";      // Add password if you set one

        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); // ✅ MySQL 8 driver
            Connection conn = DriverManager.getConnection(url, username, password);
            out.println("<h2>✅ Database Connected Successfully!</h2>");
            conn.close();
        } catch (Exception e) {
            out.println("<h3>❌ Error: " + e.getMessage() + "</h3>");
        }
    }
}
