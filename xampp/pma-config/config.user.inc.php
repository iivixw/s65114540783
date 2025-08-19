<?php
/* Auto-login ด้วย user ที่ไม่มีรหัสผ่าน */
$i = 1;
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['AllowNoPassword'] = true;

/* ต่อไปยัง service db ใน docker network เดียวกัน */
$cfg['Servers'][$i]['host'] = 'db';
$cfg['Servers'][$i]['port'] = 3306;

/* ถ้าจะใช้ root แบบไม่มีรหัส ให้ตั้งตรงนี้ */
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = '';
$cfg['Servers'][$i]['compress'] = false;
