package cn.totorotec.aliyun.ecs;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class DbClient extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(DbClient.class);

  @Override
  public void start() throws Exception {
    super.start();
    EventBus eb = vertx.eventBus();

    JsonObject json = new JsonObject().put("action", "getUserById").put("params", new JsonObject().put("id", 1));
    eb.send("dbservice", json.encode(), reply -> {
      if (reply.succeeded()) {
        LOGGER.info("客户端: " + reply.result().body());
        JsonObject json1 = new JsonObject(reply.result().body().toString());
        String action = json1.getString("action");
        LOGGER.info("Action: " + action);
        reply.result().reply(reply.result().body().toString());
        LOGGER.info("回复地址: " + reply.result().replyAddress());
      } else {
        reply.cause().printStackTrace();
      }
    });

  }

}
