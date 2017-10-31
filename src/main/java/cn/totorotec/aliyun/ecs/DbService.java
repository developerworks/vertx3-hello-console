package cn.totorotec.aliyun.ecs;

// import com.aliyuncs.profile.DefaultProfile;
// import com.aliyuncs.DefaultAcsClient;
// import com.aliyuncs.IAcsClient;
// import com.aliyuncs.ecs.model.v20140526.DescribeInstancesRequest;
// import com.aliyuncs.exceptions.ClientException;
// import com.aliyuncs.http.HttpResponse;
// import com.aliyuncs.http.FormatType;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class DbService extends AbstractVerticle {
  private static final Logger LOGGER = LoggerFactory.getLogger(DbService.class);

  @Override
  public void start() throws Exception {
    super.start();
    EventBus eb = vertx.eventBus();
    eb.consumer("dbservice", message -> {
      LOGGER.info("服务端: " + message.body());
      message.reply(message.body().toString());
    });
  }

}
