import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class StatusServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<head><title>Status Page</title></head>");
        out.println("<body><font color=\"red\">Application is running</font></body>");
        out.println("</html>");
    }
}
