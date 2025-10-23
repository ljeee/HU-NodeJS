import { sequelize } from '../config/dbconect.js';
import { initModels } from '../models/init-models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const models = initModels(sequelize);
const { users } = models;
type JwtPayload = { email: string; role?: string | undefined };

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

import type { SignOptions } from 'jsonwebtoken';

const sign = (payload: JwtPayload, secret: string, expiresIn: string) =>
    jwt.sign(payload, secret, { expiresIn } as SignOptions);

export const authenticate = (token: string): JwtPayload | null => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return { email: payload.email, role: payload.role } as JwtPayload;
    } catch {
        return null;
    }
};

const SALT_ROUNDS = 10;

export const hashPassword = (plain: string) => bcrypt.hash(plain, SALT_ROUNDS);
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

export const secureLogin = async (
    email: string,
    password: string
): Promise<{ user: InstanceType<typeof users>; token: string; refreshToken: string } | null> => {
    const user = await users.findOne({ where: { email } });
    if (!user) return null;

    const plain = user.get({ plain: true }) as { email: string; password: string; role: string };
    const ok = await verifyPassword(password, plain.password);
    if (!ok) return null;

    const payload: JwtPayload = { email: plain.email, role: plain.role };
    const token = sign(payload, JWT_SECRET, '15m');
    const refreshToken = sign(payload, REFRESH_TOKEN_SECRET, '1d');

    return { user, token, refreshToken };
};

export const createUserWithHashedPassword = async (
    email: string,
    password: string,
    name: string,
    role: string
): Promise<InstanceType<typeof users>> => {
    const existing = await users.findOne({ where: { email } });
    if (existing) throw new Error('El email ya está registrado');
    const passwordHash = await hashPassword(password);
    return users.create({ email, password: passwordHash, role, name });
};
