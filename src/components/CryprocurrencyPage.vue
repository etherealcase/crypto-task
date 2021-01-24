<template>
    <main>
        <div class="glass">
            <CryptocurrencyList/>
        </div>
    </main>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import CryptocurrencyList from "@/components/CryptocurrencyList.vue";
    import CryptocurrencyChart from "@/components/CryptocurrencyChart.vue";
    @Component({
        components: {CryptocurrencyList,CryptocurrencyChart}
    })
    export default class CryptocurrencyPage extends Vue {
        mounted() {
            this.$store.dispatch('GET_COINS')
        }
    }
</script>

<style>
    main {
        min-height: 100vh;
        background: linear-gradient(to right top, #65dfc9, #6cdbeb);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .glass {
        background: white;
        min-height: 80vh;
        width: 60%;
        background: linear-gradient(to right bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.3));
        border-radius: 2rem;
    }
</style>
