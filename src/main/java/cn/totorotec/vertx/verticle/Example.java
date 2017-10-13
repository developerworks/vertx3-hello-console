package cn.totorotec.vertx.verticle;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.asyncsql.MySQLClient;
import io.vertx.ext.sql.SQLClient;
import io.vertx.ext.sql.SQLConnection;
import java.util.List;

public class Example extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(Example.class);

  @Override
  public void start() throws Exception {
    super.start();
    JsonObject mySQLClientConfig = new JsonObject().put("host", "localhost").put("port", 3306).put("maxPoolSize", 10)
        .put("username", "root").put("password", "root").put("database", "hierarchy_data").put("charset", "UTF-8")
        .put("queryTimeout", 10000);

    SQLClient mySQLClient = MySQLClient.createShared(vertx, mySQLClientConfig);
    mySQLClient.getConnection(res -> {
      if (res.succeeded()) {

        SQLConnection connection = res.result();

        connection.query("SELECT id,nickname FROM wechat_user LIMIT 1", ar -> {
          connection.close();
          if (ar.succeeded()) {
            List<JsonObject> row = ar.result().getRows();
            LOGGER.info(row);
          } else {
            LOGGER.error("Fetch failed.");
          }
        });
      } else {
        LOGGER.error("Database connection failed.");
      }
    });
  }

}
