import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase, supabaseQuery } from '../config/supabase.js';
import fs from 'fs';
import path from 'path';

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

    // Check if phone already exists
    if (phone) {
      const cleanPhoneToCheck = phone.replace(/\D/g, '').replace(/^62|^0/, '');
      const existingPhone = await supabaseQuery.one('epanen_users', {
        where: [{ column: 'phone', value: cleanPhoneToCheck }]
      });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: 'Nomor telepon sudah digunakan oleh akun lain'
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Normalize phone number if present
    let cleanPhone = null;
    if (phone) {
      cleanPhone = phone.replace(/\D/g, '').replace(/^62|^0/, '');
    }

    // Insert new user
    const newUser = await supabaseQuery.insert('epanen_users', {
      name,
      email,
      password: hashedPassword,
      phone: cleanPhone,
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
 * User Login (Supports Email or Phone)
 */
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let identifier = email;
    let column = 'email';

    // If no email, check if phone is provided
    if (!identifier && phone) {
      identifier = phone.replace(/\D/g, '').replace(/^62|^0/, '');
      column = 'phone';
    }

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Nomor WhatsApp dan password diperlukan'
      });
    }

    // Check if it's an admin login (only via email)
    if (column === 'email') {
      const admin = await supabaseQuery.one('epanen_admins', {
        where: [
          { column: 'email', value: identifier },
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
    }

    // Check regular user
    const { data: users } = await supabaseQuery.many('epanen_users', {
      where: [
        { column: column, value: column === 'phone' ? `%${identifier}` : identifier, operator: column === 'phone' ? 'ilike' : 'eq' },
        { column: 'status', value: 'active' }
      ],
      limit: 1
    });

    const user = users && users.length > 0 ? users[0] : null;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `${column === 'email' ? 'Email' : 'Nomor WhatsApp'} atau password salah`
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: `${column === 'email' ? 'Email' : 'Nomor WhatsApp'} atau password salah`
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
 * Verify WhatsApp (Phone Number) - Step 1
 */
export const loginViaWhatsApp = async (req, res) => {
  try {
    const { phone } = req.body;
    console.log('--- WA LOGIN VERIFICATION ---');
    console.log('Original Phone:', phone);

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Nomor WhatsApp diperlukan' });
    }

    // Normalization
    const cleanNumber = phone.replace(/\D/g, '').replace(/^62|^0/, '');
    console.log('Normalized Number:', cleanNumber);

    // 1. Try finding in epanen_users
    const { data: usersByPhone } = await supabaseQuery.many('epanen_users', {
      where: [
        { column: 'phone', value: `%${cleanNumber}`, operator: 'ilike' }
      ],
      limit: 1
    });

    let user = usersByPhone && usersByPhone.length > 0 ? usersByPhone[0] : null;

    // 2. If not found, check Customer table
    if (!user) {
      const { data: customers } = await supabaseQuery.many('customer', {
        where: [
          { column: 'No Whatapps', value: `%${cleanNumber}`, operator: 'ilike' }
        ],
        limit: 1
      });

      if (customers && customers.length > 0) {
        if (customers[0].user_id) {
          user = await supabaseQuery.one('epanen_users', {
            where: [{ column: 'id', value: customers[0].user_id }]
          });
        }
      }
    }

    if (!user) {
      console.log('RESULT: User not found - Redirecting to register');
      return res.status(404).json({
        success: false,
        message: 'Nomor WhatsApp belum terdaftar. Silakan pendaftaran baru.',
        code: 'USER_NOT_FOUND',
        phone: phone // Return original phone for easier registration
      });
    }

    console.log('RESULT: User found - Requesting password');
    return res.json({
      success: true,
      message: 'Akun ditemukan. Silakan masukkan password Anda.',
      requires_password: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('WA Login verification error:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan: ' + error.message });
  }
};

/**
 * Complete Profile with Email (For WA Login)
 */
export const completeWhatsAppProfile = async (req, res) => {
  try {
    const { user_id, email, password } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Alamat email tidak valid (harus mengandung @)' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password minimal 6 karakter' });
    }

    // Check if email already used
    const existing = await supabaseQuery.one('epanen_users', {
      where: [{ column: 'email', value: email }]
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar oleh akun lain' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    const updatedUser = await supabaseQuery.update('epanen_users',
      { email, password: hashedPassword, updated_at: new Date().toISOString() },
      { where: [{ column: 'id', value: user_id }] }
    );

    const user = updatedUser[0];
    const token = generateToken(user, 'user');

    res.json({
      success: true,
      message: 'Profil diperbarui, selamat datang di ePanen!',
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
    console.error('Complete WA Profile error:', error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui profil' });
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

    // Check if phone already used by someone else
    let cleanPhone = null;
    if (phone) {
      cleanPhone = phone.replace(/\D/g, '').replace(/^62|^0/, '');

      const { data: existingPhoneUser } = await supabase
        .from('epanen_users')
        .select('id')
        .eq('phone', cleanPhone)
        .neq('id', userId)
        .single();

      if (existingPhoneUser) {
        return res.status(400).json({
          success: false,
          message: 'Nomor telepon sudah digunakan oleh akun lain'
        });
      }
    }

    const updatedUser = await supabaseQuery.update(
      'epanen_users',
      {
        name,
        phone: cleanPhone,
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
 * Change Password
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const userType = req.user.type; // 'admin' or 'user'

    const table = userType === 'admin' ? 'epanen_admins' : 'epanen_users';

    // Get current user data (including password)
    const user = await supabaseQuery.one(table, {
      where: [{ column: 'id', value: userId }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan'
      });
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password lama salah'
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await supabaseQuery.update(
      table,
      {
        password: hashedNewPassword,
        updated_at: new Date().toISOString()
      },
      { where: [{ column: 'id', value: userId }] }
    );

    // Log activity
    await supabaseQuery.insert('epanen_activity_logs', {
      user_id: userId,
      action: 'change_password',
      entity_type: userType,
      entity_id: userId
    });

    res.json({
      success: true,
      message: 'Password berhasil diperbarui'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui password'
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
