<template>
    <div class="card" style="padding: 2rem 2rem !important; margin-bottom: 1rem;">
        <h2>{{ title }}</h2>
        <h3>Elaboradas en la administración 2021 - 2024</h3>
        <div :id="name">
            <div class="grid"></div>
        </div>
    </div>
</template>

<script>
    import ApexCharts from 'apexcharts'
    export default {
        name: 'ChartLine',
        props: {
            Datas: [],
            Categos: [],
            name: '',
            title: '',
            ChartType: ''
        },
        data() {
            return {
                Datos: [],
                Catalogs: []
            }
        },
        mounted() {
            this.Datos = this.Datas
            this.Catalogs = this.Categos

            const colorPrimary = getComputedStyle(document.documentElement)
                .getPropertyValue("--bg-color-secundary")
                .trim();

            const colorDefault = getComputedStyle(document.documentElement)
                .getPropertyValue("--bg-color-secundary")
                .trim();

            const colorLabel = getComputedStyle(document.documentElement)
                .getPropertyValue("--tx-color")
                .trim();

            const fontFamily = getComputedStyle(document.documentElement)
                .getPropertyValue("--font-family")
                .trim();

            const defaultOptions = {
                chart: {
                    toolbar: {
                        show: false,
                    },
                    selection: {
                        enabled: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                    width: "100%",
                    height: 180,
                    offsetY: 8,
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: false,
                },
                states: {
                    hover: {
                        filter: {
                            type: "none",
                        },
                    },
                },
            };

            var barOptions = {
                ...defaultOptions,
                chart: {
                    ...defaultOptions.chart,
                    type: this.ChartType,
                },
                tooltip: {
                    enabled: true,
                    fillSeriesColor: false,
                    style: {
                        fontFamily: fontFamily,
                    },
                    y: {

                        formatter: (value) => {
                            return `${value} Solicitudes`;
                        },
                    },
                },
                series: [
                    {
                        name: "Este mes",
                        data: this.Datos,
                    },
                ],
                colors: [colorPrimary],
                fill: {
                    type: "gradient",
                    gradient: {
                    type: "vertical",
                    opacityFrom: 1,
                    opacityTo: 0,
                    stops: [0, 100],
                    colorStops: [
                        [
                            {
                                offset: 0,
                                color: colorPrimary,
                                opacity: 0.2,
                            },
                            {
                                offset: 100,
                                color: colorPrimary,
                                opacity: 0,
                            },
                            ],
                        ],
                    },
                },
                stroke: { colors: [colorPrimary], lineCap: "round" },
                grid: {
                    borderColor: "rgba(0, 0, 0, 0)",
                    padding: { left: 15, right: 15, top: -16, bottom: -8 },
                },
                markers: {
                    strokeColors: colorPrimary,
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    labels: {
                    floating: true,
                    show: true,
                    style: {
                        fontFamily: fontFamily,
                        colors: colorLabel,
                    },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        show: false,
                    },
                    categories: this.Catalogs,
                },
            };

            var chart = new ApexCharts(document.querySelector("#" + this.name), barOptions);
            chart.render();
        }
    }
</script>

<style scoped>

    body {
        margin: 0;
        display: grid;
        place-items: center;
        background: var(--bg-color);
        color: var(--tx-color);
        font-family: var(--font-family);
    }

    body,
    html {
        height: 100%;
    }

    h2,
    h3 {
        font-weight: 400;
        margin: 0;
    }

    h2 {
        font-size: 22px;
        margin: 0 0 1px;
    }

    h3 {
        font-size: 12px;
        color: var(--tx-color);
        margin-bottom: 20px;
    }

    .card {
        background: var(--bg-color);
        padding: 35px;
        border-radius: 24px;
        box-shadow: 0 50px 100px rgba(0, 0, 0, 0.05);
    }

    #area-chart {
        position: relative;
    }

    .grid {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 79%;
        /* background-image: repeating-linear-gradient(
            to right,
            transparent 0% 3%,
            #f9f9f9 3% 3.5%,
            transparent 3.5% 15.7%
        ); */
    }

    .grid::after {
        content: "";
        position: inherit;
        z-index: 1;
        top: inherit;
        bottom: inherit;
        width: inherit;
        height: 100%;
        /* background: linear-gradient(
            180deg,
            transparent,
            #9F2241,
            #691C32
        ); */
    }

    body .apexcharts-tooltip.apexcharts-theme-light {
        color: var(--tx-color) !important;
        background: var(--bg-color-secundary) !important;
        backdrop-filter: blur(10px);
        box-shadow: none;
        border: 0;
        padding: 8px;
    }

    body .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
        display: none;
    }

    body
    .apexcharts-xaxistooltip.apexcharts-xaxistooltip-bottom.apexcharts-theme-light {
        display: none;
    }
    /* .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
        background: var(--bg-color-active) !important;
        color: var(--tx-color) !important;
    }

    .apexcharts-tooltip-title {
        margin-bottom: 0px !important;
    } */
</style>