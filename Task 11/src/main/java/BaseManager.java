import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public final class BaseManager {

    private static void executeUpdate(String command) {
        try (Connection Connection = DriverManager.getConnection(BaseInfo.URL, BaseInfo.user, BaseInfo.password);
             Statement Statement = Connection.createStatement()) {
            Statement.executeUpdate(command);
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
    }

    private static Query executeQuery(String command) {
        Query query = new Query(BaseInfo.URL, BaseInfo.user, BaseInfo.password);
        query.execute(command);
        return query;
    }

    public static User loadUser(int userId) {
        try (Query query = executeQuery(String.format(BaseInfo.LOAD_USER_QUERY, userId))) {
            query.resultSet.next();
            return new User(query.resultSet.getInt("USER_ID"),
                    query.resultSet.getString("USER_NAME"),
                    query.resultSet.getString("USER_PHOTO"));
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }

        return new User();
    }

    public static void addPost(Post post) {
        executeUpdate(String.format(BaseInfo.ADD_POST_QUERY,
                post.author.id, post.text, post.hashtags));
    }

    public static void deletePost(Post post) {
        executeUpdate(String.format(BaseInfo.DELETE_POST_QUERY,
                post.id));
    }

    public static void updatePost(Post post) {
        executeUpdate(String.format(BaseInfo.UPDATE_POST_QUERY,
                post.text, post.hashtags, post.id));
    }

    public static JSONObject loadPosts() {
        JSONObject jsonWrapper = new JSONObject();
        JSONArray jsonPosts = new JSONArray();

        try (Query query = executeQuery(BaseInfo.LOAD_POSTS_QUERY)) {
            while (query.resultSet.next()) {
                Post post = new Post(query.resultSet.getInt("POST_ID"),
                        loadUser(query.resultSet.getInt("USER_ID")),
                        query.resultSet.getString("POST_TEXT"),
                        query.resultSet.getString("POST_DATE"),
                        query.resultSet.getInt("POST_LIKES"),
                        query.resultSet.getString("POST_HASHTAGS"));

                jsonPosts.put(post.toJSONObject());
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }

        jsonWrapper.put("posts", jsonPosts);
        return jsonWrapper;
    }

    public static void likePost(User user, Post post) {
        try (Query query = executeQuery(String.format(BaseInfo.SEARCH_LIKE_QUERY, user.id, post.id))) {
            if (query.resultSet.first()) {
                executeUpdate(String.format(BaseInfo.DELETE_LIKE_QUERY,
                        user.id, post.id));
            } else {
                executeUpdate(String.format(BaseInfo.ADD_LIKE_QUERY,
                        user.id, post.id));
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
    }

}
