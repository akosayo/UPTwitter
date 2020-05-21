public class BaseInfo {

    public static final String URL =
            "jdbc:mysql://127.0.0.1:3306/main?useTimezone=true&serverTimezone=UTC";
    public static final String user =
            "root";
    public static final String password =
            "R1FX8FFRAT76B";


    public static final String ADD_POST_QUERY =
            "INSERT INTO main.posts (USER_ID, POST_TEXT, POST_DATE, POST_HASHTAGS) VALUES (%d, '%s', NOW(), '%s');";
    public static final String DELETE_POST_QUERY =
            "DELETE FROM main.posts WHERE POST_ID = %d;";
    public static final String UPDATE_POST_QUERY =
            "UPDATE main.posts SET POST_TEXT = '%s', POST_HASHTAGS = '%s' WHERE POST_ID = %d;";
    public static final String LOAD_POSTS_QUERY =
            "SELECT main.posts.*, COUNT(main.likes.POST_ID) as POST_LIKES " +
                    "FROM main.posts LEFT JOIN main.likes USING (POST_ID) GROUP BY main.posts.POST_ID;";
    public static final String LOAD_USER_QUERY = "" +
            "SELECT main.users.* FROM main.users WHERE USER_ID = %d;";
    public static final String SEARCH_LIKE_QUERY =
            "SELECT 1 FROM main.likes WHERE USER_ID = %d AND POST_ID = %d;";
    public static final String ADD_LIKE_QUERY =
            "INSERT INTO main.likes (USER_ID, POST_ID) VALUES (%d, %d);";
    public static final String DELETE_LIKE_QUERY =
            "DELETE FROM main.likes WHERE USER_ID = %d AND POST_ID = %d;";
}
