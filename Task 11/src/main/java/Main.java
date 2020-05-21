public class Main {

    public static void main(String[] args) {
        User user = new User(5, "TEMPO", "TEMPOLINK");
        Post post = new Post(20, user, "POST TEXT TEMPO", "2018-05-05 23:04:15", 23, "hash-none-2");

        System.out.println(post.toJSONObject());
        System.out.println(user.toJSONObject());
    }
}
