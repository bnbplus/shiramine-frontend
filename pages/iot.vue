<template>
  <div class="container">
    <div class="topic-container">
      <div style="">
        <b-button @click="addTopic('facepass/shiramine-register-1-1/register')" type="is-primary" :disabled="!isIoTConnected">Subscribe Register Topic</b-button>
      </div>
      <div style="margin-left: 1rem;">
        <b-button @click="addTopic('facepass/shiramine-register-1-1/auth')" type="is-info" :disabled="!isIoTConnected">Subscribe Auth Topic</b-button>
      </div>
    </div>
    <div style="margin-top: 2rem; display: flex;">
      <div style="min-width: 160px;">IoT status:</div>
      <div><b>{{ mqttClientStatus }}</b></div>
    </div>
    <div style="display: flex;">
      <div style="min-width: 160px;">Subscribed topics:</div>
      <div>
        <template v-if="subscribedTopics.length === 0">
          <span>{{ `-` }}</span>
        </template>
        <template v-else>
          <div v-for="(topic, idx) in subscribedTopics" :key="topic">
            <b>{{ topic }}</b>
          </div>
        </template>
      </div>
    </div>
    <hr/>
    <div style="margin-top: 1.5rem;">Message Received:</div>
    <div>
      <b-table :data="receivedMsgs" :columns="columns"></b-table>
    </div>
  </div>
</template>

<script>
import AWSIoTData from "aws-iot-device-sdk"
import AWS from "aws-sdk"
import jwt from 'jsonwebtoken'

export default {
  name: "iot",
  data: () => {
    const AWSConfiguration = {
      poolId: "ap-northeast-1:6017b94f-d34d-441f-963d-ff2cf6d21df1",
      host: "a2cd8wx1hqn3dr-ats.iot.ap-northeast-1.amazonaws.com",
      region: "ap-northeast-1"
    };
    return {
      AWSConfiguration: AWSConfiguration,
      subscribedTopics: [],
      mqttClient: null,
      mqttClientStatus: 'Disconnected',
      receivedMsgs: [],
      columns: [
        {
          field: 'index',
          label: 'Index',
          width: '50',
          numeric: true,
          centered: true
        },
        {
          field: 'type',
          label: 'Type',
          width: '100',
          centered: true
        },
        {
          field: 'status',
          label: 'Status',
          width: '100',
          centered: true
        },
        {
          field: 'sub',
          label: 'Sub',
          centered: true
        },
        {
          field: 'email',
          label: 'Email',
          centered: true
        },
        {
          field: 'time',
          label: 'Received at',
          centered: true
        },
      ]
    }
  },
  computed: {
    isIoTConnected() {
      return this.mqttClientStatus === 'Connected'
    },
    isSubscribed() {
      return this.subscribedTopics.length > 0
    }
  },
  methods: {
    addTopic(topic) {
      if (this.subscribedTopics.includes(topic)) {
        return
      }
      this.subscribeTopic(topic)
    },
    subscribeTopic(iotTopic) {
      if (iotTopic) {
        console.log('subscribeTopic', this.iotTopic)
        this.mqttClient.subscribe(iotTopic, null, (err, granted) => {
          if (!err) {
            this.subscribedTopics.push(granted[0]['topic']);
          } else {
            console.error("subscribe error");
          }
        });
      } else {
        alert("Please input iotTopic");
      }
    },
    unsubscribeTopic() {
      this.disconnectIoT()
    },
    getRandomClientId() {
      return "shiramine-front-" + Math.floor(Math.random() * 10000000 + 1);
    },
    mqttClientConnectHandler() {
      console.log("MQTT Client CONNECTED !!!");
      this.mqttClientStatus = 'Connected'
    },
    mqttClientReconnectHandler() {
      console.log("MQTT Client RECONNECTING...");
      this.mqttClientStatus = 'Reconnecting'
    },
    mqttClientMessageHandler(topic, payload) {
      console.log("MQTT Client RECEIVING MESSAGE");
      console.log("From topic = " + topic);
      console.log("Payload = " + payload.toString());
      let payloadJSON = JSON.parse(payload.toString())
      console.dir(payloadJSON)
      let isRegisterType = false
      if (topic.indexOf('/register') > 0) {
        isRegisterType = true
      }
      if (payloadJSON['status'] === 0) {
        const token = payloadJSON['token']
        const decoded = jwt.decode(token)
        let dateObj = new Date(decoded['iat'] * 1000);
        this.receivedMsgs.unshift({
          'index': this.receivedMsgs.length + 1,
          'type': isRegisterType ? 'Register' : 'Auth',
          'email': isRegisterType ? payloadJSON['email'] : '-',
          'status': 'Success',
          'sub': decoded['sub'],
          'time': dateObj.toLocaleString()
        })
      }
    },
    mqttClientCloseHandler() {
      console.log("MQTT Client CLOSE");
      this.mqttClientStatus = 'Closed'
    },
    mqttClientOfflineHandler() {
      console.log("MQTT Client Offline");
      this.mqttClientStatus = 'Offline'
    },
    mqttClientErrorHandler() {
      console.log("MQTT Client Error");
      this.mqttClientStatus = 'Error'
    },
    mqttClientPacketSendHandler() {
      console.log("MQTT Client Packet Send");
    },
    mqttClientPacketReceiveHandler() {
      console.log("MQTT Client Packet Receive");
    },
    disconnectIoT() {
      if (this.mqttClient) {
        this.mqttClient.end();
        this.mqttClient = null;
      }
    },
    connectIoT() {
      this.disconnectIoT();
      this.getAWSIdentity();
    },
    async getAWSIdentity() {
      if (!AWS.config.credentials || AWS.config.credentials.needsRefresh()) {
        // Update region
        AWS.config.region = this.AWSConfiguration.region;
        // Update credentials
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.AWSConfiguration.poolId
        });
        AWS.config.credentials.get(err => {
          if (!err) {
            if (!this.mqttClient) {
              this.initMQTTClient(AWS.config.credentials.data.Credentials);
            } else {
              this.updateMQTTCredentials(AWS.config.credentials.data.Credentials);
            }
          } else {
            this.requestMsg = err.message;
            console.dir(err.message);
          }
        });
      } else {
        if (!this.mqttClient) {
          this.initMQTTClient(AWS.config.credentials.data.Credentials);
        } else {
          this.updateMQTTCredentials(AWS.config.credentials.data.Credentials);
        }
      }
    },
    updateMQTTCredentials(credentials) {
      this.mqttClient.updateWebSocketCredentials(
        credentials.AccessKeyId,
        credentials.SecretKey,
        credentials.SessionToken,
        credentials.Expiration
      );
    },
    initMQTTClient(credentials) {
      this.mqttClientStatus = "Connecting...";
      this.clientId = this.getRandomClientId();
      this.mqttClient = AWSIoTData.device({
        // Set the AWS region we will operate in.
        region: this.awsRegion,
        // Set the AWS IoT Host Endpoint
        host: this.AWSConfiguration.host,
        // Use the clientId created earlier.
        clientId: this.clientId,
        // Connect via secure WebSocket
        protocol: "wss",
        // Set the maximum reconnect time to 8 seconds; this is a browser application
        // so we don't want to leave the user waiting too long for reconnection after
        // re-connecting to the network/re-opening their laptop/etc...
        maximumReconnectTimeMs: 8000,
        // Enable console debugging information (optional)
        debug: true,
        // IMPORTANT: the AWS access key ID, secret key, and session token must be
        // initialized with empty strings.
        accessKeyId: credentials.AccessKeyId,
        secretKey: credentials.SecretKey,
        sessionToken: credentials.SessionToken,
        expiration: credentials.Expiration
      });
      this.mqttClient.on("connect", this.mqttClientConnectHandler);
      this.mqttClient.on("reconnect", this.mqttClientReconnectHandler);
      this.mqttClient.on("message", this.mqttClientMessageHandler);
      this.mqttClient.on("close", this.mqttClientCloseHandler);
      this.mqttClient.on("offline", this.mqttClientOfflineHandler);
      this.mqttClient.on("error", this.mqttClientErrorHandler);
      this.mqttClient.on("packetsend", this.mqttClientPacketSendHandler);
      this.mqttClient.on("packetreceive", this.mqttClientPacketReceiveHandler);
    },
  },
  created() {
    this.getAWSIdentity()
  }
}
</script>

<style scoped>
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}
.topic-container {
  display: flex;
  align-items: flex-end;
  margin-top: 2rem;
}
.iot-topic-input {
  min-width: 300px;
}
</style>