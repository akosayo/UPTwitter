import java.sql.*;
import java.util.NoSuchElementException;
import java.util.Optional;

public class Query implements AutoCloseable {

    boolean isReady = false;
    private Connection connection;
    private Statement statement;
    public ResultSet resultSet;

    Query(String URL, String user, String password) {
        try {
            connection = DriverManager.getConnection(URL, user, password);
            statement = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            isReady = true;
        } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            close();
        }
    }

    public boolean execute(String command) {
        try {
            if (isReady) {
                resultSet = statement.executeQuery(command);
                return true;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
            close();
        }

        return false;
    }

    public void close(){
        isReady = false;

        try {
            Optional.of(connection).get().close();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        } catch (NoSuchElementException ignore) { }

        try {
            Optional.of(statement).get().close();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        } catch (NoSuchElementException ignore) { }

        try {
            Optional.of(resultSet).get().close();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        } catch (NoSuchElementException ignore) { }
    }
}
