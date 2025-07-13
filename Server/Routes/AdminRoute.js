import express from 'express';
import { AdminLogin, getBlogsOverTime, getCategoryStats, getDashboardSummary } from '../Controller/AdminController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

export const AdminRoute=express.Router();

AdminRoute.post('/admin-login',AdminLogin);

AdminRoute.get('/admin-dashboard-stats',authMiddleware,getDashboardSummary);

AdminRoute.get('/get-blogs-overtime',authMiddleware,getBlogsOverTime);
AdminRoute.get('/get-bar-chart-data',authMiddleware,getCategoryStats);

