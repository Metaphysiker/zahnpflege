#!/bin/bash

docker build . -t hufpflege --build-context root=../../ --build-arg VITE_API_BASE_URL=https://hufpflege.sandro-raess.ch/
docker build . -t hufpflege --build-context root=../../ --build-arg VITE_API_BASE_URL=http://localhost:3001/

ssh deploy@159.223.30.119 << EOF
    docker stop hufpflege
EOF

docker save hufpflege | bzip2 | ssh deploy@159.223.30.119 docker load

ssh deploy@159.223.30.119 << EOF
    docker run -d -p 3000:3000 -p 3001:3001 --name hufpflege --rm hufpflege
EOF
