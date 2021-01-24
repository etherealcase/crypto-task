<template>
    <div class="card"  @click="showSlide()">
        <div class="main-card">
            <p>{{coin.CoinInfo.FullName}}(<span>{{coin.CoinInfo.Name}}</span>)</p>
            <div class="coin-logo">
                <img class="coin-img" :src="image" alt="coin logo"/>
                <p class="crypto-price">{{coin.DISPLAY.USD.PRICE}}</p>
            </div>
        </div>
        <transition name="fade">
            <div v-if="show">
                <CryptocurrencyChart :coin="coin" :coinName = "coinName" :show="getShow"/>
            </div>
        </transition>
    </div>
</template>


<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import CryptocurrencyChart from "@/components/CryptocurrencyChart.vue";
    @Component({
        components: {CryptocurrencyChart}
    })
    export default class CryptocurrencyItem extends Vue {
        @Prop({type: Object}) private coin: any

        public show: boolean = false

        public showSlide() {
            this.show = !this.show
            this.$store.commit('SET_SHOW_SLIDE',this.getShow)
        }

        get image(): string {
            return `https://www.cryptocompare.com${this.coin.CoinInfo.ImageUrl}`
        }

        get coinName(): string {
            return this.coin.CoinInfo.Name
        }

        get getShow(): boolean {
            return this.show
        }
    }
</script>

<style>
    .card {
        width: 80%;
        background: linear-gradient(to left top, rgba(255,255,255,0.8),rgba(255,255,255,0.7));
        border-radius: 1rem;
        margin: 2rem 0;
        padding: 2rem;
        box-shadow: 6px 6px 20px rgba(122,122,122,0.7);
    }

    .main-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .coin-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 40px;
    }

    .coin-img {
        width: 40px;
        height: 40px;
        padding-bottom: 5px;
    }
</style>
