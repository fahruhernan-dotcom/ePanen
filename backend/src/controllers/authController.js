import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase, supabaseQuery } from '../config/supabase.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT Token
 */
const generateToken = (user, type = 'user') => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      type: type
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

/**
 * User Registration
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if email already exists
    const existingUser = await supabaseQuery.one('epanen_users', {
      where: [{ column: 'email', value: email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await supabaseQuery.insert('epanen_users', {
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: 'farmer'
    });

    // Log activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: newUser.id,
      action: 'register',
      entity_type: 'user',
      entity_id: newUser.id
    });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          status: newUser.status,
          created_at: newUser.created_at
        },
        token: generateToken(newUser, 'user')
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat registrasi'
    });
  }
};

/**
 * User Login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if it's an admin login
    const admin = await supabaseQuery.one('epanen_admins', {
      where: [
        { column: 'email', value: email },
        { column: 'status', value: 'active' }
      ]
    });

    if (admin) {
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (isValidPassword) {
        const token = generateToken(admin, 'admin');

        return res.json({
          success: true,
          message: 'Login berhasil sebagai admin',
          data: {
            user: {
              id: admin.id,
              username: admin.username,
              email: admin.email,
              role: admin.role,
              type: 'admin'
            },
            token
          }
        });
      }
    }

    // Check regular user
    const user = await supabaseQuery.one('epanen_users', {
      where: [
        { column: 'email', value: email },
        { column: 'status', value: 'active' }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Log activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: user.id,
      action: 'login',
      entity_type: 'user',
      entity_id: user.id
    });

    // Generate token
    const token = generateToken(user, 'user');

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          type: 'user'
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat login'
    });
  }
};

/**
 * Get Current User Profile
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.type === 'admin') {
      const admin = await supabaseQuery.one('epanen_admins', {
        where: [{ column: 'id', value: userId }]
      });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin tidak ditemukan'
        });
      }

      return res.json({
        success: true,
        data: {
          user: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            created_at: admin.created_at
          },
          type: 'admin'
        }
      });
    }

    const user = await supabaseQuery.one('epanen_users', {
      where: [{ column: 'id', value: userId }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          created_at: user.created_at
        },
        type: 'user'
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil profile'
    });
  }
};

/**
 * Update User Profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user.id;

    const updatedUser = await supabaseQuery.update(
      'epanen_users',
      {
        name,
        phone: phone || null,
        updated_at: new Date().toISOString()
      },
      { where: [{ column: 'id', value: userId }] }
    );

    res.json({
      success: true,
      message: 'Profile berhasil diperbarui',
      data: {
        user: {
          id: updatedUser[0].id,
          name: updatedUser[0].name,
          email: updatedUser[0].email,
          phone: updatedUser[0].phone,
          role: updatedUser[0].role,
          status: updatedUser[0].status
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate profile'
    });
  }
};

/**
 * Logout
 */
export const logout = async (req, res) => {
  try {
    // Log activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: req.user.id,
      action: 'logout',
      entity_type: 'user',
      entity_id: req.user.id
    });

    res.json({
      success: true,
      message: 'Logout berhasil'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat logout'
    });
  }
};
