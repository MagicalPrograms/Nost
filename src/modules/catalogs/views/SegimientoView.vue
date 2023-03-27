<template>
    <div>
        <h3>Segimiento de solicitud</h3>
        <div class="card catalog-body mb-2 p-2">
            <div class="row">
                <div class="col-sm-3">
                    <button class="form-control" id="Responder" @click="selectOption($event)">
                        Responder
                    </button>
                </div>
                <div class="col-sm-3">
                    <button class="form-control" id="Prorroga" @click="selectOption($event)">
                        Prorroga
                    </button>
                </div>
                <div class="col-sm-3">
                    <button class="form-control" id="Aclaracion" @click="selectOption($event)">
                        Aclaración
                    </button>
                </div>
            </div>
        </div>

        <h3 v-show="Target != ''">{{ Target }}</h3>
        <div v-show="Target != ''" class="card catalog-body mb-2" style="padding: 1.5rem;">
            <div v-show="Target == 'Responder'">
                <div class="row">
                    <div class="col-sm-12">
                        Observación
                        <textarea class="form-control mb-1" id="" cols="30" rows="5"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        Evidencia
                        <input type="file" class="form-control" />
                    </div>
                </div>
            </div>
            <div v-show="Target == 'Prorroga'">
                Prorroga
            </div>
            <div v-show="Target == 'Aclaracion'">
                Aclaracion
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Target: ''
            }
        },

        methods: {
            selectOption: function(event) {
                this.Target = event.currentTarget.id;
            }
        }
    }
</script>

<style scoped>

</style>