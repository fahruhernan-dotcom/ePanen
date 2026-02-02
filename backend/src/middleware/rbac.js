/**
 * Role-Based Access Control Middleware
 */

export const canAccess = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autentikasi diperlukan.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki izin untuk mengakses resource ini.'
      });
    }

    next();
  };
};

export const canModify = (req, res, next) => {
  // Users can only modify their own resources (unless admin)
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next();
    }

    const resourceUserId = parseInt(req.params.userId || req.params.id);

    if (resourceUserId && resourceUserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki izin untuk memodifikasi resource ini.'
      });
    }

    next();
  };
};
