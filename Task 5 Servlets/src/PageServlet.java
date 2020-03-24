import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class PageServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        InputStream input = getServletContext().getResourceAsStream("/WEB-INF/page.html");

        byte[] readHTML = new byte[4096];
        input.read(readHTML);

        PrintWriter out = response.getWriter();
        out.print(new String(readHTML));
    }
}
