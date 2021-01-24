<template>
    <div>
        <div class="list" v-for="coin in coins" :key="coin.CoinInfo.Id">
            <CryptocurrencyItem :coin="coin"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CryptocurrencyItem from "@/components/CryptocurrencyItem.vue";

    @Component({
        components: {
            CryptocurrencyItem
        },
    })
    export default class CryptocurrencyList extends Vue {

        get coins() {
            return this.$store.getters.coins
        }

    }
</script>

<style>
    .list {
        display: flex;
        justify-content: center;
    }
</style>
