# NGINX host setup

This project includes `nginx/default.conf` for serving static files on port 80 and proxying API/health requests to the Express app on `127.0.0.1:3000`.

## 1) Run the app

```bash
npm install
npm start
```

## 2) Install NGINX config

Copy `nginx/default.conf` to your NGINX site config location.

Common paths:

- Debian/Ubuntu: `/etc/nginx/sites-available/fibo.conf` (then symlink into `sites-enabled`)
- RHEL/CentOS/Alma/Rocky: `/etc/nginx/conf.d/fibo.conf`

## 3) Update static root path

In the config file, set:

```nginx
root /var/www/fibo/public;
```

to your real project path.

## 4) Validate and reload NGINX

```bash
nginx -t
systemctl reload nginx
```

## 5) Verify

- Static site: `http://<your-host>/`
- Health endpoint: `http://<your-host>/health`
- Grind API: `http://<your-host>/grind?text=hello&n=5`
