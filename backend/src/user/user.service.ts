import { UserRepository } from "./user.repository.js";
import jwt from "jsonwebtoken";

const secretKey = 'your_secret_key';
const usuarioRepository = new UserRepository();

export class UsuarioService {
    async login(usuario: string, password: string): Promise<string | null> {
        const user = await usuarioRepository.findByUsuario(usuario);
        if (user && user.password === password) {
            const token = jwt.sign({ id: user.id, usuario: user.usuario }, secretKey, { expiresIn: '1h' });
            return token;
        }
        return null;
    }
}