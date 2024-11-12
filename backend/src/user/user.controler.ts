import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"
import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken';



const repository = new UserRepository()
function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  // Verificamos si los datos requeridos están presentes
  const requiredFields = [
      'nombre', 'apellido', 'telefono', 'mail', 'Rol', 'password', 'usuario', 'idve'
  ];

  for (let field of requiredFields) {
      if (!req.body[field]) {
          return res.status(400).json({ message: `Falta el campo requerido: ${field}` });
      }
  }

  // Sanitizamos la entrada
  req.body.sanitizedInput = {
      nroCliente: req.body.nroCliente,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      mail: req.body.mail,
      Rol: req.body.Rol,
      password: req.body.password,
      usuario: req.body.usuario,
      idve: req.body.idve,
  };

  // Limpiamos campos con valores undefined
  Object.keys(req.body.sanitizedInput).forEach(key => {
      if (req.body.sanitizedInput[key] === undefined) {
          delete req.body.sanitizedInput[key];
      }
  });

  next();
}



async function findAll(req: Request, res: Response) {
    res.json({ data: await repository.findAll() })
}



async function findOne(req: Request, res: Response) {
    const id = req.params.id
    const user = await repository.findOne({ id })
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    res.json({ data: user })
}
  


async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput
  
    const userInput = new User(
        input.nroCliente,
        input.nombre,
        input.apellido,
        input.telefono,
        input.mail,
        input.Rol,
        input.usuario,
        input.password,
        input.idve,
    )
  
    const user = await repository.add(userInput)
    return res.status(201).send({ message: 'User created', data: user })
}
  

async function update(req: Request, res: Response) {
    const user = await repository.update(req.params.id,req.body.sanitizedInput)
  
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
  
  return res.status(200).send({ message: 'User updated successfully', data: user })
}


async function remove(req: Request, res: Response) {
    const id = req.params.id
    const user = await repository.delete({ id })
  
    if (!user) {
      res.status(404).send({ message: 'User not found' })
    } else {
      res.status(200).send({ message: 'User deleted successfully' })
    }
}


  async function create(req: Request, res: Response) {
    const input = req.body.sanitizedInput;

    if (!input || !input.nombre || !input.apellido || !input.telefono || !input.mail || !input.Rol || !input.usuario || !input.password || !input.idve) {
      return res.status(400).json({ message: "Faltan datos requeridos para crear el usuario" });
  }
    const userInput = new User(
        input.nroCliente,
        input.nombre,
        input.apellido,
        input.telefono,
        input.mail,
        input.Rol,
        input.password,
        input.usuario,
        input.idve
    )

    try {

      const createdUser = await repository.create(userInput)

      if (!createdUser) {
        return res.status(500).json({ message: "No se pudo crear el usuario" })
    }

       
        res.status(201).json({ message: "Usuario creado exitosamente", id: createdUser.id })

    } catch (error) {
        console.error("Error al crear el usuario:", error)
    }
  }
  
    async function login(req: Request, res: Response) {
      const {usuario,password}= req.body
      if (!usuario || !password) {
        return res.status(400).json({ message: "Faltan datos requeridos: usuario y contraseña." });
      }
    try {
      const user = await repository.login({ usuario, password });

      if (!user) {
          return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
      }
        const token = jwt.sign(
          { 
            id: user.id, 
            usuario: user.usuario, 
            idve: user.idve,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            mail: user.mail
          },
          "this-is-an-awesome-secret-key",
          { expiresIn: "1h" }
        );
  

      return res.status(200).json({ message: "Inicio de sesión exitoso", data: user,token });
     } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
      }     


    }



export{sanitizeUserInput,findAll,findOne,add,update,remove,create,login}