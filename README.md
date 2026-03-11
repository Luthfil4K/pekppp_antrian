# Sistem Antrian Digital

Aplikasi ini merupakan sistem antrian digital yang menggunakan **Next.js**, **Prisma ORM**, dan **MySQL** sebagai database.

## Persyaratan

Pastikan perangkat Anda sudah terinstall:

* Node.js
* MySQL / MariaDB
* npm

---

# Instalasi

Clone repository:

```
git clone https://github.com/Luthfil4K/kompas_disiplin.git
cd nama-folder-project
```

Install dependency:

```
npm install --legacy-peer-deps
```

---

# Setup Prisma

Inisialisasi Prisma:

```
npx prisma init
```

Setelah itu akan muncul file `.env`.

Edit file `.env` dan sesuaikan konfigurasi berikut:

```
DATABASE_URL=""
NEXT_PUBLIC_LOCAL_URL=""
```

Contoh:

```
DATABASE_URL="mysql://root:@localhost:3306/pekppp_antrian"
NEXT_PUBLIC_LOCAL_URL="http://localhost:3000"
```

---

# Migrasi Database

Jalankan migrasi untuk membuat struktur database:

```
npx prisma migrate dev
```

Generate Prisma Client:

```
npx prisma generate
```

---

# Menjalankan Aplikasi

Untuk menjalankan server:

```
node server.js
```

---

# Catatan

* Pastikan database sudah dibuat terlebih dahulu di MySQL.
* File `.env` tidak di-upload ke GitHub karena berisi konfigurasi sensitif.
* Gunakan `.env.example` jika ingin membagikan struktur environment variable.

---

# Teknologi yang Digunakan

* Next.js
* Prisma ORM
* MySQL
* Node.js
