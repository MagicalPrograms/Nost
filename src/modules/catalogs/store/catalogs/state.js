
export default () => ({
    requests: [],
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