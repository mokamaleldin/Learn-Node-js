const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',      // أو IP السيرفر
    user: 'postgres',       // اسم المستخدم
    password: '242527',   // كلمة المرور
    database: 'nodeshop',   // اسم قاعدة البيانات
    port: 5432              // المنفذ الافتراضي لـ PostgreSQL
});

module.exports = pool;
