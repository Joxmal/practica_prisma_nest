import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class SeedService {

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) { }

  async seedAdmin(key: string) {

    if (key !== process.env.SECRET_KEY) throw new ForbiddenException("no autorizado")

    const existAdmin = await this.prisma.user.findFirst({
      where: {
        name: "admin",
      }
    })

    if (existAdmin) return "Administrador ya existe"

    await this.usersService.create({
      name: "admin",
      password: "admin123",
      role: Role.SUPERADMIN,
    })

    return {
      name: "admin",
      password: "admin123"
    }
  }

  async data_DB(key: string) {
    if (key !== process.env.SECRET_KEY) throw new ForbiddenException("no autorizado")

    const message = {
      categorias: 'X',
      cooperador: 'X',
      post: 'X',
      postFiles: 'X'
    }

    //debug para borrar todo antes
    await this.prisma.categoria.deleteMany()
    await this.prisma.cooperador.deleteMany()
    await this.prisma.post.deleteMany()


    message.categorias = await this.crearCaterogias()
    message.cooperador = await this.crearCooperador()
    message.post = await this.crearPost()

    return message

  }

  private async crearCaterogias() {
    try {
      const categorias: string[] = process.env.CATEGORIAS.split(',');

      const categoriasData = categorias.map((categoria) => ({
        name: categoria
      }));

      await this.prisma.categoria.createMany({
        data: categoriasData
      })

      return 'categorias creadas con exito'
    } catch (error) {
      console.log(error)
      if (error.code === 'P2002' && error?.meta.target[0] === 'name') {
        return 'categorias ya estaba creada'
      }
      throw new ConflictException('Error Interno')
    }
  }

  private async crearCooperador() {
    try {
      const patrocinador: any = 'patrocinador'
      const colaborador: any = 'colaborador'
      const cooperadorDataSeed = [
        { tipoCedula: "J", cedula: 25542356, nombre: "sancho Panza Montes", ubicacion: "mariño casco central", tipo: colaborador, categorias: { connect: { name: 'idiomático' } } },
        { tipoCedula: "V", cedula: 12345678, nombre: "María Rodríguez", ubicacion: "Caracas", tipo: patrocinador, categorias: { connect: { name: 'ecoturismo' } } },
        { tipoCedula: "J", cedula: 98765432, nombre: "Juan Pérez", ubicacion: "Valencia", tipo: colaborador, categorias: { connect: { name: 'deportivo' } } },
        { tipoCedula: "V", cedula: 87654321, nombre: "Ana Gómez", ubicacion: "Maracaibo", tipo: patrocinador, categorias: { connect: { name: 'parques temáticos' } } },
        { tipoCedula: "V", cedula: 28045702, nombre: "Jose Montes", ubicacion: "mariño casco central", tipo: patrocinador, categorias: { connect: { name: 'gastronómico' } } }
      ]
      const array_promises = []
      cooperadorDataSeed.forEach((cooperador) =>{
        
        array_promises.push(this.prisma.cooperador.create({data: cooperador }))
      })

      await Promise.all(array_promises)

      return 'cooperador creado con exito'
    } catch (error) {
      console.log(error)
      throw new ConflictException('Error Interno en el seed de copooperadores')
    }

  }

  private async crearPost(id1=1,id2 =2){

    const files = await this.prisma.filesPost.findMany()

    if(files[0] && files[1]){
      id1 = files[0].id
      id2 = files[1].id
    }


    try {
      const postDataSeed = [
        {
          title: "hallacas navideñas",
          content: [
            'Había una vez una rana llamada Filomena. A ella le encantaba jugar, cantar y saltar, pero no le gustaba prestar sus cosas. Un día, Filomena pidió muchos deseos a una estrella, pero ninguno de ellos era realmente bueno. Quería tener una muñeca para hacer que su amiga Entonela se pusiera celosa. La estrella le dijo que en tres días tendría que cambiar su actitud.',
            'En un bosque encantado vivía un ratón llamado Tomás. Él era muy curioso y siempre se aventuraba en busca de nuevas experiencias. Un día, mientras exploraba, encontró un túnel misterioso. Sin pensarlo dos veces, decidió adentrarse en él. A medida que avanzaba, descubrió un mundo lleno de criaturas mágicas y tesoros escondidos. Tomás se dio cuenta de que la verdadera aventura estaba en atreverse a explorar lo desconocido.',
            'En un pequeño pueblo, vivía una niña llamada Lucía. Ella soñaba con convertirse en una gran bailarina. Todos los días practicaba incansablemente, perfeccionando sus movimientos y expresión. Un día, se anunció un concurso de baile en la ciudad y Lucía decidió participar. Con su gracia y pasión, cautivó al público y ganó el primer lugar. Desde ese día, su sueño se hizo realidad y se convirtió en una bailarina reconocida en todo el mundo.'
          ],
          published: true,
          images:[
            'https://i.postimg.cc/bvpdrH36/playa_bella_vista06_(1).jpg',
            'https://i.postimg.cc/MTJ5vLgC/noticia-1.jpg',
            'https://i.postimg.cc/TPt2w8yw/playa_bella_vista05_(1).jpg'
          ],
          author: {
            connect:{
              name: 'admin'
            }
          },
          files:{
            connect:[
              {id:id1},
              {id:id2}
            ]
          },
          cooperador:{
            connect:[
              {cedula: 28045702}
            ]
          }
        },
        {
          title: "Mariño tiene Cafe",
          content: [
            'Había una vez una rana llamada Filomena. A ella le encantaba jugar, cantar y saltar, pero no le gustaba prestar sus cosas. Un día, Filomena pidió muchos deseos a una estrella, pero ninguno de ellos era realmente bueno. Quería tener una muñeca para hacer que su amiga Entonela se pusiera celosa. La estrella le dijo que en tres días tendría que cambiar su actitud.',
            'En un bosque encantado vivía un ratón llamado Tomás. Él era muy curioso y siempre se aventuraba en busca de nuevas experiencias. Un día, mientras exploraba, encontró un túnel misterioso. Sin pensarlo dos veces, decidió adentrarse en él. A medida que avanzaba, descubrió un mundo lleno de criaturas mágicas y tesoros escondidos. Tomás se dio cuenta de que la verdadera aventura estaba en atreverse a explorar lo desconocido.',
            'En un pequeño pueblo, vivía una niña llamada Lucía. Ella soñaba con convertirse en una gran bailarina. Todos los días practicaba incansablemente, perfeccionando sus movimientos y expresión. Un día, se anunció un concurso de baile en la ciudad y Lucía decidió participar. Con su gracia y pasión, cautivó al público y ganó el primer lugar. Desde ese día, su sueño se hizo realidad y se convirtió en una bailarina reconocida en todo el mundo.'
          ],
          published: true,
          images:[
            'https://i.postimg.cc/bvpdrH36/playa_bella_vista06_(1).jpg',
            'https://i.postimg.cc/MTJ5vLgC/noticia-1.jpg',
            'https://i.postimg.cc/TPt2w8yw/playa_bella_vista05_(1).jpg'
          ],
          author: {
            connect:{
              name: 'admin'
            }
          },
          files:{
            connect:[
              {id:id1},
              {id:id2}
            ]
          },
          cooperador:{
            connect:[
              {cedula: 28045702}
            ]
          }
        },
        {
          title: "La sabrosura esta en chuao",
          content: [
            'Había una vez una rana llamada Filomena. A ella le encantaba jugar, cantar y saltar, pero no le gustaba prestar sus cosas. Un día, Filomena pidió muchos deseos a una estrella, pero ninguno de ellos era realmente bueno. Quería tener una muñeca para hacer que su amiga Entonela se pusiera celosa. La estrella le dijo que en tres días tendría que cambiar su actitud.',
            'En un bosque encantado vivía un ratón llamado Tomás. Él era muy curioso y siempre se aventuraba en busca de nuevas experiencias. Un día, mientras exploraba, encontró un túnel misterioso. Sin pensarlo dos veces, decidió adentrarse en él. A medida que avanzaba, descubrió un mundo lleno de criaturas mágicas y tesoros escondidos. Tomás se dio cuenta de que la verdadera aventura estaba en atreverse a explorar lo desconocido.',
            'En un pequeño pueblo, vivía una niña llamada Lucía. Ella soñaba con convertirse en una gran bailarina. Todos los días practicaba incansablemente, perfeccionando sus movimientos y expresión. Un día, se anunció un concurso de baile en la ciudad y Lucía decidió participar. Con su gracia y pasión, cautivó al público y ganó el primer lugar. Desde ese día, su sueño se hizo realidad y se convirtió en una bailarina reconocida en todo el mundo.'
          ],
          published: true,
          images:[
            'https://i.postimg.cc/bvpdrH36/playa_bella_vista06_(1).jpg',
            'https://i.postimg.cc/MTJ5vLgC/noticia-1.jpg',
            'https://i.postimg.cc/TPt2w8yw/playa_bella_vista05_(1).jpg'
          ],
          author: {
            connect:{
              name: 'admin'
            }
          },
          files:{
            connect:[
              {id:id1},
              {id:id2}
            ]
          },
          cooperador:{
            connect:[
              {cedula: 28045702}
            ]
          }
        }
      ]

      // await this.prisma.post.create({
      //   data: postDataSeed[0]
      // })

      const array_promises = []
      postDataSeed.forEach((post) => {
        array_promises.push(this.prisma.post.create({data:post}))
      })

      await Promise.all(array_promises)


      return 'posts creados con exito'

    } catch (error) {
      console.log(error)
      throw new ConflictException('Error Interno al crear seed de Post')
    }
  }


}
