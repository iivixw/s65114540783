-- postgres/init.sql  (เวอร์ชันแก้)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'appuser') THEN
    CREATE USER appuser WITH PASSWORD 'apppass';
  END IF;
END$$;

-- ตอนรันสคริปต์นี้ เราเชื่อมต่ออยู่กับ DB appdb แล้ว (เพราะ POSTGRES_DB=appdb)
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO appuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO appuser;
