Your API token is

```
b3vEOG9CnveHVE-7CpeR1KrADk76MVD3nW9A9mnvcCo
```

Log in with this token

```
oc login --token=b3vEOG9CnveHVE-7CpeR1KrADk76MVD3nW9A9mnvcCo --server=https://192.168.99.101:8443
```

Use this token directly against the API

```
curl -H "Authorization: Bearer b3vEOG9CnveHVE-7CpeR1KrADk76MVD3nW9A9mnvcCo" "https://192.168.99.101:8443/oapi/v1/users/~"
```


#
minishift start --vm-driver=virtualbox
oc login https://192.168.99.102:8443 -u developer -p developer
oc new-project reactive-microservices
oc policy add-role-to-user admin developer -n reactive-microservices
oc policy add-role-to-user view -n reactive-microservices -z default


oc login -u system:admin -n default --config=<homedir>/openshift.local.config/master/admin.kubeconfig


mvn fabric8:deploy -Dfabric8.replicas=2 -Popenshift
mvn fabric8:start -Dfabric8.replicas=2 -Popenshift

mvn fabric8:cluster-start -Dfabric8.cluster.kind=openshift
mvn fabric8:cluster-start -Pfmp-snapshot -Dfabric8.cluster.driver=virtualbox -Dfabric8.cluster.kind=openshift

# 完整的 fabric8 平台
mvn fabric8:cluster-start -Dfabric8.cluster.app=platform
mvn fabric8:cluster-start -Dfabric8.cluster.cpus=2 -Dfabric8.cluster.memory=4096


fabric8.cluster.driver
fabric8.cluster.kind
fabric8.cluster.cpus
fabric8.cluster.memory

# 停止
mvn fabric8:cluster-stop
mvn fabric8:cluster-start

# 销毁
mvn fabric8:cluster-stop -Dfabric8.cluster.delete=true

# fabric8

gofabric8 start --vm-driver=virtualbox
gofabric8 start --memory=6000 --cpus=2
gofabric8 validate
gofabric8 console

gofabric8 service fabric8 --url
gofabric8 service gogs
gofabric8 service jenkins
gofabric8 service nexus


oc new-project nodejs-echo --display-name="nodejs" --description="Sample Node.js app"
