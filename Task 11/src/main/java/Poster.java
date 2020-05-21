import org.apache.commons.io.IOUtils;
import org.json.JSONObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class Poster extends HttpServlet {

    @Override @Deprecated
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        JSONObject jsonData = new JSONObject(IOUtils.toString(request.getReader()));

        switch (jsonData.getString("method")) {
            case "delete":
                BaseManager.deletePost(new Post(jsonData.getJSONObject("post")));
                break;

            case "create":
                BaseManager.addPost(new Post(jsonData.getJSONObject("post")));
                break;

            case "update":
                BaseManager.updatePost(new Post(jsonData.getJSONObject("post")));
                break;
        }

    }
}
