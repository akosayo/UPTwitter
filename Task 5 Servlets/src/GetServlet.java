import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class GetServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nameParam = request.getParameter("name");
        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<head><title>Status Page</title></head>");
        out.println("<body>Name is " + nameParam + "</body>");

    }
}
