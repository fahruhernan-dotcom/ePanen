import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Auth routes
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/Register.vue'),
      meta: { guest: true }
    },

    {
      path: '/chat',
      name: 'Chat',
      component: () => import('../views/user/Chat.vue')
    },
    // Home & User routes - public layout, some pages require auth
    {
      path: '/',
      component: () => import('../components/user/UserLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/user/Home.vue')
        },
        // Removed Chat from here
        {
          path: 'articles',
          name: 'Articles',
          component: () => import('../views/user/Articles.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'articles/:id',
          name: 'ArticleDetail',
          component: () => import('../views/user/ArticleDetail.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'prices',
          name: 'Prices',
          component: () => import('../views/user/Prices.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'discussions',
          name: 'Discussions',
          component: () => import('../views/user/Discussion.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('../views/user/Profile.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },

    // Admin routes (Nala Office)
    {
      path: '/admin',
      component: () => import('../components/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'chatlogs',
          name: 'ChatLogs',
          component: () => import('../views/admin/ChatLogs.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/admin/Users.vue')
        },
        {
          path: 'content',
          name: 'Content',
          component: () => import('../views/admin/Content.vue')
        },
        {
          path: 'discussions',
          name: 'AdminDiscussions',
          component: () => import('../views/admin/Discussions.vue')
        },
        {
          path: 'market',
          name: 'AdminMarket',
          component: () => import('../views/admin/Market.vue')
        }
      ]
    },

    // Catch all - redirect to login or home
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: () => {
        const authStore = useAuthStore();
        return authStore.isAuthenticated ? '/' : '/login';
      }
    }
  ]
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Attempt to restore session if token exists but not authenticated yet (e.g. on page reload)
  if (authStore.token && !authStore.isAuthenticated) {
    try {
      await authStore.checkAuth();
    } catch (error) {
      console.error('Session restoration failed:', error);
    }
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Save the intended route for redirect after login
      sessionStorage.setItem('redirectAfterLogin', to.fullPath);
      next('/login');
      return;
    }
  }

  // Check role-based access for admin routes
  if (to.meta.role === 'admin' && !authStore.isAdmin()) {
    next('/');
    return;
  }

  // Redirect authenticated users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    if (authStore.isAdmin()) {
      next('/admin');
    } else {
      next('/');
    }
    return;
  }

  next();
});

export default router;
