import { Request, Response } from 'express';
import * as UsuarioService from '../services/UserService';

export class UserController {

  static async crear(req: Request, res: Response) {
    try {
      const { nombre, email, password } = req.body;
      if (password && password.length >= 8) {
        const nuevo = await UsuarioService.crearUsuario({ nombre, email, password });
        res.status(201).json(nuevo);
      } else {
        res.status(400).json({ mensaje: "Contraseña demasiado corta" }); // mejor 400 Bad Request
      }
    } catch (error: unknown) {
      console.error("Error creando usuario:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al crear usuario", error: String(error) });
      }
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioService.obtenerUsuarios();
      res.json(usuarios);
    } catch (error: unknown) {
      console.error("Error listando usuarios:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al listar usuarios", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al listar usuarios", error: String(error) });
      }
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.body.id);
      console.log("METODO LISTA ID", id);
      const usuario = await UsuarioService.obtenerUsuarioPorId(id);
      if (usuario) res.json(usuario);
      else res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error: unknown) {
      console.error("Error obteniendo usuario por ID:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: String(error) });
      }
    }
  }

  static async LoginPorMail(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const usuario = await UsuarioService.obtenerLoginPorMail(email, password);

      if (usuario) {
        res.json(usuario);
      } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
    } catch (error: unknown) {
      console.error("Error en login por mail:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error en el login", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error en el login", error: String(error) });
      }
    }
  }
}
