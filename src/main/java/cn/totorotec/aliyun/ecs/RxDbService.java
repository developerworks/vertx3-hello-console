// package cn.totorotec.aliyun.ecs;

// import io.vertx.core.json.JsonObject;

// import io.vertx.rxjava.core.eventbus.EventBus;
// import io.vertx.rxjava.core.AbstractVerticle;
// import io.vertx.rxjava.core.eventbus.Message;
// import rx.Single;

// /**
//  * RxDbService
//  */
// public class RxDbService extends AbstractVerticle {

//   @Override
//   public void start() {
//     EventBus bus = vertx.eventBus();

//     Single<JsonObject> object = bus.<JsonObject>rxSend("address", "message").map(Message::body);
//   }

// }
