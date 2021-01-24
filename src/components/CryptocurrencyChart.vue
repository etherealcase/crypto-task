<template>
    <div>
        <div class="loader-part" v-if="!calculatePercent">
            Loading...
        </div>
        <div v-else>
            Изменение: {{calculatePercent}} % Текущая стоимость: {{this.currentPrice.P}} $
        </div>
        <div class="chart-block">
            <div>
                <canvas id="planet-chart"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Chart from 'chart.js';

    @Component
    export default class CryptocurrencyChart extends Vue {
        @Prop({type: Object}) private coin: any
        @Prop({type: String}) private coinName: any
        @Prop({type: Boolean}) private show: any
        public currentPrice: number = 0;
        public currentCoin: string = ''
        public arrayWithTimeForChart: [] = []
        public arrayWithPriceForChart: [] = []

        created() {
            this.currentCoin = this.coinName
            this.websocket()
        }

        get chart() {
            this.allDate
            return {
                type: 'line',
                data: {
                    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    datasets: [
                        {
                            label: `${this.currentCoin} price`,
                            data: this.arrayWithPriceForChart,
                            backgroundColor: [
                                'rgba(71, 183,132,.5)', // Green
                            ],
                            borderColor: [
                                '#47b784',
                            ],
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    lineTension: 1,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                padding: 25,
                            }
                        }]
                    }
                }
            }
        }

        createChart(chartId: any, chartData: any) {
            const ctx = document.getElementById(chartId);
            new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }

        get dataForChart() {
            return this.$store.getters.dataForChart
        }


        get allDate() {
            return this.dataForChart.Data.map((data: any) => {
                let date = new Date(data.time * 1000)
                this.arrayWithPriceForChart.push(data.open)
                this.arrayWithTimeForChart.push(date.getDay())
            })
        }

        async mounted() {
            await this.$store.dispatch('GET_DATA_FOR_CHART', this.currentCoin)
            this.createChart('planet-chart', this.chart);
        }


        get showSlide() {
            return this.$store.getters.showSlide
        }


        get calculatePercent() {
            if (this.currentPrice.P === undefined) {
                return
            } else {
                let price = parseFloat(this.currentPrice.P.toString().replace(/\$/g, '').replace(/[\s,%]/g, ''))
                let openDayPrice = parseFloat(this.coin.DISPLAY.USD.OPENDAY.replace(/\$/g, '').replace(/[\s,%]/g, ''))
                return -(100 - (price / (openDayPrice / 100))).toFixed(2)
            }
        }


        websocket() {
            let apiKey = "157809fcf00a55b0bdbc1b6b095c0548f193a90c0e77f263bc5687c29fdcf8ce";
            let ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
            ccStreamer.onopen = () => {
                let subRequest = {
                    "action": "SubAdd",
                    "subs": [`0~Coinbase~${this.currentCoin}~USD`]
                };
                ccStreamer.send(JSON.stringify(subRequest));
            }

            ccStreamer.onmessage = (message) => {
                this.currentPrice = JSON.parse(message.data)
                if (this.showSlide === false) {
                    if (ccStreamer.readyState === WebSocket.OPEN) {
                        ccStreamer.close();
                    }
                    ccStreamer.close()
                }
            }

            ccStreamer.onclose = () => {
                console.log('END')
            };

        }

    }
</script>

<style>
    .loader-part {
        min-height: 50px;
        min-width: 50px;
    }
</style>
