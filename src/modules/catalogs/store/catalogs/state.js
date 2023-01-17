
export default () => ({
    requests: [
        {
            id: '01',
            Description: 'Se solicitan todos los poa de la administración anteriro',
            Type: {
                id: 1,
                name: 'Información Pública'
            },
            Dependencie: {
                id: 1,
                name: 'Unidad de Transparencia'
            },
            Fechas: {
                Fecha_Impresion: '2022-01-01',
                Fecha_Respuesta: '2022-01-01',
                Fecha_Aclaracion: '2022-01-02',
                Fecha_Prorroga: '2022-01-03'
            }
        },
        {
            id: '02',
            Description: 'Se solicitan el motivo de por que cambiaron de color las patrulla',
            Type: {
                id: 1,
                name: 'Información Pública'
            },
            Dependencie: {
                id: 2,
                name: 'Tesoreria'
            },
            Fechas: {
                Fecha_Impresion: '2022-01-01',
                Fecha_Respuesta: '2022-01-01',
                Fecha_Aclaracion: '2022-01-02',
                Fecha_Prorroga: '2022-01-03'
            }
        },

    ]
})