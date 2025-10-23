
import type { Request, Response } from 'express';
import { secureLogin, createUserWithHashedPassword } from '../services/auth.service.js';

export const registerUserController = async (req: Request, res: Response) => {
  const { correo, password, name, role } = req.body;
  if (
    typeof correo !== 'string' ||
    typeof password !== 'string' ||
    typeof name !== 'string'
  ) {
    return res.status(400).json({ message: 'correo, password y name son requeridos' });
  }
  try {
    const userrole = typeof role === 'string' ? role : 'user';
    const newUser = await createUserWithHashedPassword(
      correo,
      password,
      name,
      userrole
    );
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error?.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { correo, password } = req.body;
  if (typeof correo !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'correo y password son requeridos' });
  }
  try {
    const loginResult = await secureLogin(correo, password);
    if (!loginResult) {
      return res.status(401).json({ message: 'correo o password inválidos' });
    }
    res.status(200).json(loginResult);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error?.message });
  }
};