-- Tabla: users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'vendedor')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  address VARCHAR(150),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL CHECK (stock >= 0),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_product_user FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- Tabla: orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  user_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT NOW(),
  total DECIMAL(10,2) DEFAULT 0 CHECK (total >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_order_customer FOREIGN KEY (customer_id)
    REFERENCES customers (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- Tabla: order_details
CREATE TABLE IF NOT EXISTS order_details (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_order_detail_order FOREIGN KEY (order_id)
    REFERENCES orders (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_order_detail_product FOREIGN KEY (product_id)
    REFERENCES products (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- Insertar usuario admin
INSERT INTO users (name, email, password, role)
VALUES (
  'Admin Principal',
  'admin@ejemplo.com',
  '12345',
  'admin'
);

-- Insertar usuario vendedor
INSERT INTO users (name, email, password, role)
VALUES (
  'Vendedor Uno',
  'vendedor@ejemplo.com',
  '12345',
  'vendedor'
);

INSERT INTO products (code, name, description, price, stock) VALUES
  ('P-1001', 'Camiseta Básica', 'Camiseta 100% algodón, color blanco, talla única', 50000, 150),
  ('P-1002', 'Sudadera Capucha', 'Sudadera con capucha, forro interior suave, varios colores', 139600, 60),
  ('P-1003', 'Pantalón Chino', 'Pantalón chino corte slim, tejido elástico', 119960, 80),
  ('P-1004', 'Zapatos Urbanos', 'Zapatos urbanos de cuero sintético, suela antideslizante', 279800, 40),
  ('P-1005', 'Gorra Ajustable', 'Gorra con visera curva y cierre trasero ajustable', 39960, 200);