import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class CheckServlet extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println("{\"success\": true}");

    }
}
