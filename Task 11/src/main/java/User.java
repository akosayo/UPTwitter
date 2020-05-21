import org.json.*;

public final class User {

    public int id;
    public String name;
    public String photo;

    User() {
        this(0, "", "");
    }

    User(int id, String name, String photo) {
        this.id = id;
        this.name = name;
        this.photo = photo;
    }

    User(JSONObject jsonUser) {
        this.id = jsonUser.has("id") ? jsonUser.getInt("id") : 0;
        this.name = jsonUser.has("name") ? jsonUser.getString("name") : "";
        this.photo = jsonUser.has("photo") ? jsonUser.getString("photo") : "";
    }

    JSONObject toJSONObject() {
        JSONObject jsonUser = new JSONObject();

        jsonUser.put("id", id);
        jsonUser.put("name", name);
        jsonUser.put("photo", photo);

        return jsonUser;
    }
}