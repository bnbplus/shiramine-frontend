<template>
    <div>
        {{ getUserSpots(users) }}
        <div v-for="(user, i) in users" :key="i">
            {{ user.id }} | {{ user.data.time }} | {{ user.data.spot }}
        </div>
    </div>
</template>

<script>
export default {
    layout:'travelers',
    data() {
        return {
            users: [],
            spots: [],
        }
    },
    mounted() {
        for (let i=1; i<=80; i++) {
            this.getMovement(i)
            .then( ( res ) => {
                this.users.push({
                    id: i,
                    data: res
                })
            } )
            .then( _ => {
                this.users = this.users.sort((a, b) => a.id > b.id ? 1 : -1  )
                this.getUserSpots()
            })
        }
    },
    methods: {
        async getMovement(beaconId) {
            try {
                const back = await this.$axios.get(`https://api.studio.conect.plus/sensingData/MAazlhKUo6QB8xztO47O/d17cba64-27eb-414f-b44c-5e6197a3578d/Beacon_${beaconId}/place`)
                const oneData = back.data.reduce( (a, b) => a.sensingAt > b.sensingAt ? a : b )
                return {
                    time: oneData.sensingAt,
                    spot: oneData.value01
                }
            } catch ( err ) {
                return null
            }
        },
        getUserSpots(users) {
            let spots = []
            let counts = []
            for (const user of users) {
                if ( !spots.includes( user.data.spot ) ) {
                    spots.push( user.data.spot )
                    counts.push( 1 )
                } else {
                    counts[ spots.indexOf( user.data.spot ) ] ++
                }
            }
            let out = []
            for (let i=0; i<spots.length; i++) {
                out.push({
                    spot: spots[i],
                    count: counts[i],
                })
            }
            return out
        }
    }
}
</script>

<style>

</style>