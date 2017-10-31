// package cn.totorotec.vertx.rx;

// import io.vertx.core.json.JsonObject;
// import io.vertx.reactivex.core.AbstractVerticle;
// import io.vertx.reactivex.ext.jdbc.JDBCClient;

// public class Filter extends AbstractVerticle {
//   @Override
//   public void start() throws Exception {
//     super.start();
//     JsonObject config = new JsonObject()
//       .put("url", "jdbc:mysql://localhost:3306/hierarchy_data?useSSL=false")
//       .put("provider_class","io.vertx.ext.jdbc.spi.impl.C3P0DataSourceProvider")
//       .put("driver_class", "com.mysql.jdbc.Driver")
//       .put("user", "root")
//       .put("password", "root")
//       .put("max_pool_size", 15)
//       .put("min_pool_size", 1)
//       .put("max_statements", 100)
//       .put("max_statements_per_connection", 10)
//       .put("max_idle_time", 0);
//   }
// }
