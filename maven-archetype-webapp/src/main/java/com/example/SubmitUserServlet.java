package com.example;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.net.*;

public class SubmitUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Get data from JSP form
        String name = request.getParameter("name");
        String email = request.getParameter("email");

        // Create JSON to send to Node API
        String jsonData = "{\"name\":\"" + name + "\", \"email\":\"" + email + "\"}";

        // Send POST request to Node.js
        URL url = new URL("http://localhost:3000/add-user");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        // Write JSON data to request
        OutputStream os = conn.getOutputStream();
        os.write(jsonData.getBytes());
        os.flush();
        os.close();

        // Read response from Node server
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder apiResponse = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            apiResponse.append(inputLine);
        }
        in.close();

        // Show result to user
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h2>✅ Response from Node API:</h2>");
        out.println("<p>" + apiResponse.toString() + "</p>");
    }
}
