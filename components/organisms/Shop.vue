<template> 
    <div class="container column is-10">
        <div class="box" v-for="(users, i) in userData" :key="i">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <div>
                            名前：{{users.name}}
                            <b-button tag="router-link" to="/" type="is-link"> 退出 </b-button>
                        </div>
                        
                        <div class="table-container">
                            
                                <b-table
                                    :data="requestData"
                                    :debounce-search="1000"
                                    :mobile-cards="false"
                                    :numeric= "true"
                                >
                                    <template slot-scope="p" v-if="p.row.userId===users.id">
                                        <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.information }}</b-table-column>
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
        </div>
    </div>
</template>

<script>
//{{ requestData.filter( user => users.id === user.id )[0].information }}
export default {
    data(){
        return{
            formSolutioner:[]
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
        }
    },
}
</script>