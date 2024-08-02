# Heroes App version 18.1.1.

Arquitectura de rutas de un proyecto a media y gran escala

## Dev

1. Clonar proyecto
2. Ejecutar `npm install | npm i`
3. Levantar backend `npm run back`

## Json Server

Importante tener instalada la librería de `json-server` en su versión `0.17.4`.

`npm install --save-dev json-server@0.17.4`

`npm i -D json-server@0.17.4`

## Routing

Rutas principales, Rutas hijas y lazyloads

## ReactiveForms

Formularios reactivos `heroes/pages/new-page`

## CRUD

En heroes.service `Create | Read | Update | Delete`

## ReactiveX Rxjs

En el page `heroes/pages/new-page.component.ts` se encuentra la mayoría de logica referente a `Rxjs` se encuentra en el método `onConfirmDeletion()`

# Guards

Guards de autenticación, importados en las rutas root `app-routing.module.ts` de la app y creados en el folder de `auth`