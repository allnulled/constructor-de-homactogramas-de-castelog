#!/usr/bin/bash
echo 'Construyendo proyecto...'
npm run build
echo 'Escribe el motivo del commit: '
read motivo
echo 'Haciendo git add'
ls -lA
git add .
git status
echo 'Haciendo git commit'
git commit -am "$motivo"
echo 'Haciendo git push'
git push