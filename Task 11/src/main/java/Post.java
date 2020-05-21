import org.json.JSONObject;

public final class Post {

    public int id;
    public User author;
    public String text;
    public String date;
    public int likes;
    public String hashtags;

    Post(int id, User author, String text, String date, int likes, String hashtags) {
        this.id = id;
        this.author = author;
        this.text = text;
        this.date = date;
        this.likes = likes;
        this.hashtags = hashtags;
    }

    Post(JSONObject jsonPost) {
        this.id = jsonPost.has("id") ? jsonPost.getInt("id") : 0;
        this.author = jsonPost.has("author") ? new User(jsonPost.getJSONObject("author")) : new User();
        this.text = jsonPost.has("text") ? jsonPost.getString("text") : "";
        this.date = jsonPost.has("date") ? jsonPost.getString("date")
                .replace("T", "" )
                .replace("Z", "") : "2000-01-01 00:00:00";

        this.likes = jsonPost.has("likes") ? jsonPost.getInt("likes") : 0;
        this.hashtags = jsonPost.has("hashtags") ? jsonPost.getString("hashtags") : "";
    }

    JSONObject toJSONObject() {
        JSONObject jsonPost = new JSONObject();

        jsonPost.put("id", id);
        jsonPost.put("author", author.toJSONObject());
        jsonPost.put("text", text);
        jsonPost.put("date", date);
        jsonPost.put("likes", likes);
        jsonPost.put("hashtags", hashtags);

        return jsonPost;
    }


}
