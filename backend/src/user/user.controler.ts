import { UserRepository } from "./user.repository.js"
import { User } from "./user.entity.js"
import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken';



const repository = new UserRepository()
function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  const requiredFields = [
      'nombre', 'apellido', 'telefono', 'mail', 'Rol', 'password', 'usuario'
  ];

  for (let field of requiredFields) {
      if (!req.body[field]) {
          return res.status(400).json({ message: `Falta el campo requerido: ${field}` });
      }
  }

  req.body.sanitizedInput = {
      nroCliente: req.body.nroCliente,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      mail: req.body.mail,
      Rol: req.body.Rol,
      password: req.body.password,
      usuario: req.body.usuario,
      idve: req.body.idve ?? null,
  };

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
  try {

    const user = await repository.update(
      req.params.id,
      req.body.sanitizedInput
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).send({
      message: 'User updated successfully',
      data: user
    });

  } catch (error: any) {
    return res.status(400).send({
      message: error.message
    });
  }
}



async function remove(req: Request, res: Response) {
  const id = req.params.id
  try {
    const user = await repository.delete({ id })
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    } else {
      return res.status(200).send({ message: 'User desactivado correctamente', data: user })
    }
  } catch (error:any) {
    console.error("Error en remove controller:", error);
    return res.status(500).send({ message: 'Error interno del servidor' })
  }
}

async function activateUser(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const user = await repository.activate(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send({ message: 'User activado correctamente', data: user });
  } catch (error:any) {
    console.error("Error en activateUser controller:", error);
    return res.status(500).send({ message: 'Error interno del servidor' });
  }
}



async function create(req: Request, res: Response) {
  const input = req.body.sanitizedInput;

  if (
    !input.nombre ||
    !input.apellido ||
    !input.telefono ||
    !input.mail ||
    !input.Rol ||
    !input.usuario ||
    !input.password
  ) {
    return res.status(400).json({
      message: "Faltan datos requeridos para crear el usuario",
    });
  }

  const userInput = new User(
    0,
    input.nombre,
    input.apellido,
    input.telefono,
    input.mail,
    input.Rol,
    input.password,
    input.usuario,
    null
  );

  try {
    const createdUser = await repository.create(userInput);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: {
        id: createdUser?.id,
        nroCliente: createdUser?.nroCliente
      }
    });

  } catch (error: any) {
    if (error.message === "Usuario ya existe") {
      return res.status(409).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

  
async function login(req: Request, res: Response) {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      message: "Faltan datos requeridos: usuario y contraseña."
    });
  }

  try {
    const user = await repository.login({ usuario, password });

    if (!user) {
      return res.status(401).json({
        message: "Usuario o contraseña incorrectos."
      });
    }

    // 🔒 BLOQUEO POR BAJA LÓGICA
    if (user.activo !== 1) {
      return res.status(403).json({
        message: "Usuario desactivado. Contacte al administrador."
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nroCliente: user.nroCliente,
        usuario: user.usuario,
        idve: user.idve,
        nombre: user.nombre,
        apellido: user.apellido,
        mail: user.mail,
        telefono: user.telefono,
        Rol: user.Rol,
        activo: user.activo
      },
      "this-is-an-awesome-secret-key",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token
    });

  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

async function findVehiclesByUser(req: Request, res: Response) {
  const usuarioId = req.params.usuarioId;
  const vehicles = await repository.findVehiclesByUser(Number(usuarioId));

  if (vehicles.length === 0) {
    return res.status(404).send({ message: 'No vehicles found for the user' });
  }

  res.json({ data: vehicles });
}

async function addVehicleToUser(req: Request, res: Response) {
  try {
    const { usuarioId, vehiculoId } = req.body;

    if (!usuarioId || !vehiculoId) {
      return res.status(400).json({ message: "usuarioId y vehiculoId son requeridos" });
    }

    await repository.addVehicleToUser(usuarioId, vehiculoId);

    res.status(201).json({ message: "Vehículo asignado al usuario exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asignar el vehículo al usuario" });
  } 
}




export{sanitizeUserInput,findAll,findOne,add,update,remove,create,login,findVehiclesByUser,addVehicleToUser,activateUser}