import java.io.*;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;

public class LoggerFilter implements Filter {

    public void init(FilterConfig filterConfig) {}

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        long startTime = System.currentTimeMillis();
        chain.doFilter(request, response);

        PrintWriter out = response.getWriter();
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        out.print("<html><body>");
        out.print("<br>URL: " + httpRequest.getRequestURL());
        out.print("<br>Type: " + httpRequest.getMethod());
        out.print("<br>Time: " + (System.currentTimeMillis() - startTime));
        out.print("</body></html>");
    }

    public void destroy() {}
}