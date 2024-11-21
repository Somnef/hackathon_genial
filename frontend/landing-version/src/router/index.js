import { createRouter, createWebHistory } from 'vue-router';
import Login from '../auth/Login.vue';
import Signup from '../auth/Signup.vue';
import RecoverPassword from '../auth/RecoverPassword.vue';
import CheckTheEmail from '../auth/CheckTheEmail.vue';
import Main from '../layouts/Main.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        name: 'signup',
        path: '/signup',
        component: Signup,
      },
      {
        name: 'recover-password',
        path: '/recover-password',
        component: RecoverPassword,
      },
      {
        name: 'recover-password-email',
        path: '/recover-password-email',
        component: CheckTheEmail,
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory('/'), // Set the base path here
  routes,
});

export default router;