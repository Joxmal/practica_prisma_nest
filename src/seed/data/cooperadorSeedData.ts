const patrocinador: any = 'patrocinador'
const colaborador: any = 'colaborador'
export const cooperadorDataSeed = [
    { tipoCedula: "J", cedula: 25542356, nombre: "sancho Panza Montes", ubicacion: "mariño casco central", tipo: colaborador, categorias: { connect: { name: 'idiomático' } } },
    { tipoCedula: "V", cedula: 12345678, nombre: "María Rodríguez", ubicacion: "Caracas", tipo: patrocinador, categorias: { connect: { name: 'ecoturismo' } } },
    { tipoCedula: "J", cedula: 98765432, nombre: "Juan Pérez", ubicacion: "Valencia", tipo: colaborador, categorias: { connect: { name: 'deportivo' } } },
    { tipoCedula: "V", cedula: 87654321, nombre: "Ana Gómez", ubicacion: "Maracaibo", tipo: patrocinador, categorias: { connect: { name: 'parques temáticos' } } },
    { tipoCedula: "V", cedula: 28045702, nombre: "Jose Montes", ubicacion: "mariño casco central", tipo: patrocinador, categorias: { connect: { name: 'gastronómico' } } }
]