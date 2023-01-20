
export default () => ({
    requests: [
        {
            id: '01',
            Descripcion: 'Se solcita el motivo de por que cambiaron el color de las patrullas municipales',
            DescripcionAdicional: 'Fundamento legal',
            correo: 'info@gob.mx',
            Dependencia: {
                id: 4,
                name: 'Dirección de planiación'
            },
            Tipo: {
                id: 1,
                name: 'Información Pública'
            },
            Accesibilidad: {
                id: 0,
                name: '-- Seleccióna una accesibilidad --'
            },
            Recepcion: {
                id: 1,
                name: 'Información disponible via PNT'
            },
            Fechas: {
                fecha_impresion: '2022-01-01',
                fecha_aclaracion: '2022-05-03',
                fecha_prorroga: '2022-04-15',
                fecha_respuesta: '2022-05-10'
            }
        },
    ],
    OptionsType: [
        { name: '-- Seleccióna un Tipo --', id: 0 },
        { name: 'Información Pública', id: 1 },
        { name: 'Datos Personales', id: 2 }
    ],
    OptionsDiscapacidad: [
        { name: '-- Seleccióna una accesibilidad --', id: 0 },
        { name: 'Auditiva', id: 1 },
        { name: 'Visual', id: 2 }
    ],
    OptionsRespuestas: [
        { name: '-- Seleccióna un medio --', id: 0 },
        { name: 'Información disponible via PNT', id: 1 },
        { name: 'Correo electronico', id: 2 }
    ],
    OptionsDependencie: [
        { name: '-- Seleccióna una Dependencia --', id: 0 },
        { name: 'Dirección de la Unidad de Transparencia', id: 1 },
        { name: 'Dirección de ingresos', id: 2 },
        { name: 'Dirección de informatica', id: 3 },
        { name: 'Dirección de planiación', id: 4 }
    ],
})