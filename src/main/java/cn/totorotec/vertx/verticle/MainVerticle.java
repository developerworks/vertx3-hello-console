package cn.totorotec.vertx.verticle;

import io.vertx.core.AbstractVerticle;

public class MainVerticle extends AbstractVerticle {

  @Override
  public void start() {
    vertx.createHttpServer().requestHandler(req -> req.response().end("Hello World, it works !")).listen(8080);
  }
}
