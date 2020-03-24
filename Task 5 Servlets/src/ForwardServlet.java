import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class ForwardServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        RequestDispatcher forwarder = getServletContext().getRequestDispatcher("/status");
        forwarder.forward(request, response);
    }
}
