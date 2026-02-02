import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Verify JWT token and attach user to request
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan. Silakan login.'
      });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      type: decoded.type || 'user' // 'user' or 'admin'
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token telah kadaluarsa. Silakan login kembali.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token tidak valid.'
    });
  }
};

/**
 * Check if user is admin
 */
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' || req.user.type !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Memerlukan hak akses admin.'
    });
  }

  next();
};

/**
 * Check if user is farmer
 */
export const isFarmer = (req, res, next) => {
  if (req.user.role !== 'farmer' && req.user.type !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'Akses ditolak. Halaman ini khusus untuk petani.'
    });
  }

  next();
};

/**
 * Optional auth - attach user if token exists, but don't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        type: decoded.type || 'user'
      };
    }

    next();
  } catch (error) {
    // Continue without user
    next();
  }
};
