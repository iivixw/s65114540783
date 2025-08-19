##1) Clone

git clone https://github.com/iivixw/Project.git

cd Project

##2) Create API env (จำเป็น)

##---ไฟล์นี้ไม่ควร commit---

type NUL > api\.env

echo PORT=5000>> api\.env

echo DB_HOST=mysql>> api\.env

echo DB_PORT=3306>> api\.env

echo DB_NAME=appdb>> api\.env

echo DB_USER=appuser>> api\.env

echo DB_PASS=apppass>> api\.env

##3) Run with Docker

docker compose up -d --build

docker compose ps

##4) URLs

Frontend: http://localhost:5173

API: http://localhost:5000

PHP (XAMPP): http://localhost:8080

phpMyAdmin: http://localhost:8085

##---Database (inside Docker network):---

Host: mysql | Port: 3306

Users: root/rootpass หรือ appuser/apppass

Default DB: appdb

##Useful Commands
docker compose logs -f                 :: ดูทุก service

docker compose logs -f api             :: ดูเฉพาะ api

docker compose restart api             :: รีสตาร์ท api

docker compose exec api sh             :: เข้ากล่อง api

docker compose exec mysql mysql -uroot -prootpass   :: เข้า MySQL

docker compose down                    :: ปิดทั้งหมด (ไม่ลบข้อมูล)

##Notes / Troubleshooting

>ถ้าพอร์ตชน ให้แก้เลขพอร์ตใน docker-compose.yml แล้วรัน docker compose up -d ใหม่

>ในโค้ด/.env ต้องใช้ DB_HOST=mysql และ DB_PORT=3306 (ห้ามใช้ 127.0.0.1 ภายในคอนเทนเนอร์)

>เข้า phpMyAdmin ไม่ได้: รอให้ mysql เป็น healthy แล้วลอง root/rootpass อีกครั้ง
