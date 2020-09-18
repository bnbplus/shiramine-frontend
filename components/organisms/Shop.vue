<template> 
    <div class="container is-10">
        <div class="box" v-for="(user, i) in stayShop" :key="i">
            <article class="media">
                <div class="media-content">
                    <div class="content is-size-5">
                        <div class="is-size-4" style="display: flex;">
                            <div class="has-text-weight-bold">名前：{{user.name}}</div>
                            <b-button tag="router-link" to="/" type="is-link" style="margin-left:5%"> 退出 </b-button>
                        </div>
                    </div>
                    <b-table
                        :data="userRequests"
                        :debounce-search="1000"
                        :mobile-cards="false"
                        :numeric= "true"
                    >
                        <template slot-scope="p" v-if="p.row.userId===user.id">
                            <b-table-column :field="columns[0].field" :label="columns[0].label" width="65%">{{ p.row.information }}</b-table-column>
                            <b-table-column :field="columns[1].field" :label="columns[1].label">
                                <form @submit.prevent="doneRequest(p.row.id)">
                                    <b-field>
                                        <b-select v-model="formSolutioner[getFormSolutionerIndex(p.row.id)].value">
                                            <option v-for="(users, i) in userData" :value="users.id" :key="i">
                                                {{ users.name }}
                                            </option>
                                        </b-select>
                                        <b-button native-type="submit" type="is-link" style="left:5%">
                                            完了
                                        </b-button>
                                    </b-field>
                                </form>
                            </b-table-column>
                        </template>
                    </b-table>
                </div>
            </article>
        </div>
        <!-- <div class="box" v-for="(users, i) in userData" :key="i">
            <article class="media">
                <div class="media-content">
                    <div class="content is-size-5">
                        <div class="is-size-4" style="display: flex;">
                            <div class="has-text-weight-bold">名前：{{users.name}}</div>
                            <b-button tag="router-link" to="/" type="is-link" style="margin-left:5%"> 退出 </b-button>
                        </div>
                        
                        <div class="table-container">
                            
                                <b-table
                                    :data="requestData"
                                    :debounce-search="1000"
                                    :mobile-cards="false"
                                    :numeric= "true"
                                >
                                    <template slot-scope="p" v-if="p.row.userId===users.id">
                                        <b-table-column :field="columns[0].field" :label="columns[0].label" width="65%">{{ p.row.information }}</b-table-column>
                                        <b-table-column :field="columns[1].field" :label="columns[1].label">
                                            <form @submit.prevent="doneRequest(p.row.id)">
                                                <b-field>
                                                    <b-select v-model="formSolutioner[getFormSolutionerIndex(p.row.id)].value">
                                                        <option v-for="(users, i) in userData" :value="users.id" :key="i">
                                                            {{ users.name }}
                                                        </option>
                                                    </b-select>
                                                    <b-button native-type="submit" type="is-link" style="left:5%">
                                                        完了
                                                    </b-button>
                                                </b-field>
                                            </form>
                                        </b-table-column>
                                    </template>
                                </b-table>
                        </div>
                    </div>
                </div>
            </article>
        </div> -->

    </div>
</template>

<script>
import AWSIoTData from "aws-iot-device-sdk"
import AWS from "aws-sdk"
import jwt from 'jsonwebtoken'

export default {
    data(){
        const AWSConfiguration = {
            poolId: "ap-northeast-1:6017b94f-d34d-441f-963d-ff2cf6d21df1",
            host: "a2cd8wx1hqn3dr-ats.iot.ap-northeast-1.amazonaws.com",
            region: "ap-northeast-1"
        }
        return{
            AWSConfiguration: AWSConfiguration,
            subscribedTopics: [],
            mqttClient: null,
            mqttClientStatus: 'Disconnected',
            receivedMsgs: [],
            formSolutioner:[],
            stayShop: [],
            userRequests: [],
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
    props:{
        requestData:{
            type: Array,
            requiered: true
        },
        userData:{
            type: Array,
            requiered: true
        },
        columns:{
            type: Array,
            requiered: true
        }
    },
    created() {
        this.getAWSIdentity()
        for (const data of this.requestData) {
            this.formSolutioner.push({ id: data.id, value: null })
        }
    },
    methods: {
        async doneRequest (requestId) {
            try {
                const back = await this.$axios.$post(`/request/done/${requestId}`, {
                    solutioner: this.formSolutioner
                }, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    },
                })
                
            } catch (err) {
                console.log(err);
            }
        },
        getFormSolutionerIndex(requestId) {
            const index = this.formSolutioner.findIndex(e => e.id === requestId)
            return index
        },
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
        async mqttClientMessageHandler(topic, payload) {
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

            // ここに通知

            const nowUserSub = this.receivedMsgs[0].sub
            let newUser = await this.getUserData(nowUserSub)
            // // FIXME: テスト用あとで消す
            // newUser = {
            //     "id": 1,
            //     "name": "suzuki",
            //     "email": "suzuki.test@gmail.com",
            //     "role": "admin",
            //     "bleNumber": 24,
            //     "bnbplusSubject": "08dc1e6b-861b-45c5-aa24-813cd650a2f1",
            //     "createdAt": "2020-09-16T20:11:03.000Z",
            //     "updatedAt": "2020-09-16T20:11:03.000Z"
            // }
            if ( !!newUser ) {
                this.stayShop.push( newUser )
                await this.setRequests()
                console.log('req', this.userRequests);
                this.$buefy.notification.open({
                    message: `${newUser.name}さんが来店しました。`,
                    type: 'is-success'
                })
            } else {
                console.log('未登録ユーザ');
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
        async getUserData(bnbsub) {
            try {
                const back = await this.$axios.get(`/users`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    }
                })
                return back.data.records.find( x => x.bnbplusSubject == bnbsub )
            } catch ( err ) {}
            return null
        },
        async setRequests() {
            try {
                const back = await this.$axios.get(`/requests`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    }
                })
                console.log(back);
                this.userRequests = back.data.records
            } catch (err) {} 
        }
    },
    mounted() {
        window.setTimeout( _ => { this.addTopic('facepass/shiramine-register-1-1/auth');console.log('move'); }, 500)
    }
}
</script>

<style module>
.shop_alert {
    position: absolute;
    top: 0px;
    left: 25%;
    width: 50vw;
    z-index: 100;
}
</style>