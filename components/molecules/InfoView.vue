<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p>
                    <strong>{{ title }}</strong>
                    <br>
                        {{ info }}
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type: String,
            requiered: true
        },
        info:{
            type: String,
            requiered: true
        }
    },
}
</script>

<style>

</style>