import { Request, Response } from 'express';
import * as GastosService from '../services/GastoService';

export class GastosController {

  static async crear(req: Request, res: Response) {
    try {
      const { monto, descripcion, fecha, idusuario, tipo, categoria } = req.body;

      const nuevo = await GastosService.crearGasto({
        monto,
        descripcion,
        fecha,
        usuarioId: idusuario,
        tipoId: tipo,
        categoriaId: categoria
      });

      res.status(201).json(nuevo);

    } catch (error: unknown) {
      console.error("Error creando gasto:", error);

      // Manejo seguro del error
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al crear gasto", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al crear gasto", error: String(error) });
      }
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const gastos = await GastosService.obtenerUsuarios(); // Parece que debería ser obtenerGastos o similar
      res.json(gastos);
    } catch (error: unknown) {
      console.error("Error listando gastos:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al listar gastos", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al listar gastos", error: String(error) });
      }
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const gasto = await GastosService.obtenerGastoPorId(id);
      if (gasto) res.json(gasto);
      else res.status(404).json({ mensaje: 'Gasto no encontrado' });
    } catch (error: unknown) {
      console.error("Error obteniendo gasto por ID:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al obtener gasto", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al obtener gasto", error: String(error) });
      }
    }
  }

  static async obtenerTodosIngresosCategorias(req: Request, res: Response) {
    try {
      const idtipo = req.body.tipo;
      console.log("el tipo es " + idtipo);
      const categorias = await GastosService.obtenerTipoIngresoCategorias(idtipo);
      if (categorias) res.json(categorias);
      else res.status(404).json({ mensaje: 'Categorías no encontradas' });
    } catch (error: unknown) {
      console.error("Error obteniendo categorías de ingresos:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al obtener categorías", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al obtener categorías", error: String(error) });
      }
    }
  }

  static async obtenerTodosGastosCategorias(req: Request, res: Response) {
    try {
      const idtipo = req.body.tipo;
      console.log("el tipo es " + idtipo);
      const categorias = await GastosService.obtenerTiposGastosCategorias(idtipo);
      if (categorias) res.json(categorias);
      else res.status(404).json({ mensaje: 'Categorías no encontradas' });
    } catch (error: unknown) {
      console.error("Error obteniendo categorías de gastos:", error);
      if (error instanceof Error) {
        res.status(500).json({ mensaje: "Error al obtener categorías", error: error.message });
      } else {
        res.status(500).json({ mensaje: "Error al obtener categorías", error: String(error) });
      }
    }
  }

}
