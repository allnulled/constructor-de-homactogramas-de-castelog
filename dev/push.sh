#!/usr/bin/bash
echo 'Escribe el motivo del commit: '
read motivo
echo 'Construyendo proyecto...'
npm run build
echo 'Haciendo git add'
git add .
echo 'Haciendo git commit'
git commit -m $motivo
echo 'Haciendo git push'
git push