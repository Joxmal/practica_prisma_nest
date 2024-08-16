export const consult_get_post = {
  author: {
    select: {
      id: true,
      name: true,
    },
  },
  cooperador: {
    omit: {
      cedula: true,
      ubicacion: true,
    },
  },
  files: {
    omit: {
      patch: true,
      size: true,
    },
  },
  categoria:true
};

export const consult_get_post2 =(req:any,secureUrl: string)=>{
    return {
        author: {
            select: {
              id: true,
              name: true,
            },
          },
          cooperador: {
            omit: {
              cedula: true,
              ubicacion: true,
            },
          },
          files: {
            omit: {
              patch: true,
              size: true,
            },
          },  
    }
}