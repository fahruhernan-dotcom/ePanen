import { body, validationResult } from 'express-validator';

/**
 * Validation middleware
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array()
    });
  }

  next();
};

/**
 * Validation rules
 */
export const validationRules = {
  register: [
    body('name')
      .trim()
      .notEmpty().withMessage('Nama tidak boleh kosong')
      .isLength({ min: 3, max: 100 }).withMessage('Nama harus 3-100 karakter'),
    body('email')
      .trim()
      .isEmail().withMessage('Email tidak valid')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
    body('phone')
      .optional()
      .isMobilePhone('id-ID').withMessage('Nomor telepon tidak valid')
  ],

  login: [
    body('email')
      .trim()
      .isEmail().withMessage('Email tidak valid')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password tidak boleh kosong')
  ],

  sendMessage: [
    body('message')
      .trim()
      .notEmpty().withMessage('Pesan tidak boleh kosong')
      .isLength({ min: 1, max: 1000 }).withMessage('Pesan harus 1-1000 karakter')
  ],

  createArticle: [
    body('title')
      .trim()
      .notEmpty().withMessage('Judul tidak boleh kosong')
      .isLength({ min: 5, max: 200 }).withMessage('Judul harus 5-200 karakter'),
    body('content')
      .trim()
      .notEmpty().withMessage('Konten tidak boleh kosong'),
    body('category_id')
      .optional()
      .isInt().withMessage('Category ID harus integer')
  ],

  createDiscussion: [
    body('title')
      .trim()
      .notEmpty().withMessage('Judul tidak boleh kosong')
      .isLength({ min: 5, max: 200 }).withMessage('Judul harus 5-200 karakter'),
    body('content')
      .trim()
      .notEmpty().withMessage('Konten tidak boleh kosong'),
    body('category')
      .optional()
      .isLength({ max: 50 }).withMessage('Kategori maksimal 50 karakter')
  ],

  updatePrice: [
    body('name')
      .trim()
      .notEmpty().withMessage('Nama komoditas tidak boleh kosong'),
    body('price')
      .isFloat({ min: 0 }).withMessage('Harga harus angka positif'),
    body('unit')
      .trim()
      .notEmpty().withMessage('Satuan tidak boleh kosong')
  ]
};
