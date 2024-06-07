docker run --name hufpflege-db -e MYSQL_ROOT_PASSWORD=hufpflege -e MYSQL_DATABASE=hufpflege -e MYSQL_USER=hufpflege -e MYSQL_PASSWORD=hufpflege -d mysql:latest

MYSQL_ROOT_PASSWORD=hufpflege
MYSQL_DATABASE=hufpflege
MYSQL_USER=hufpflege
MYSQL_PASSWORD=hufpflege

---

docker build . -t hufpflege --build-context root=../../ --build-arg VITE_API_BASE_URL=http://localhost:3001/

docker compose up --build
