import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga variables de .env

// Crea la instancia de Sequelize con la URI de Supabase
const sequelize = new Sequelize(process.env.DATABASE_URL!, { // Reemplaza con tu URI
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Habilita SSL (obligatorio en Supabase)
      rejectUnauthorized: false, // Para desarrollo; en producción, usa el certificado del dashboard
    },
  },
  logging: false, // Desactiva logs de consultas (opcional)
  pool: {
    max: 100, // Máximo de conexiones en el pool (ajusta según tu plan de Supabase)
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Función para conectar y verificar
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a Supabase establecida correctamente.');
    await sequelize.sync({ alter: false }); // Sincroniza modelos (usa con cuidado en producción)
  } catch (error) {
    console.error('Error al conectar con Supabase:', error);
  }
}

export { sequelize, connectDB };