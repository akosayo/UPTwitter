import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class IndexServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();

        out.println("<html>");
        out.println("<head><title>Index Page</title></head>");
        out.println("<body>Java Web Application</body>");
        out.println("</html>");
    }
}
