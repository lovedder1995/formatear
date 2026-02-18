#!/usr/bin/env node
import { execSync as ejecutar } from "child_process"
/*
=============
= Formatear =
=============
*/
/* Simplemente formateamos */ ejecutar("npx eslint-autocontenido --fix .", {
    /* desde la carpeta donde se está ejecutando el comando */ cwd: process.cwd(),
    /* y mostramos todo lo que devuelva ESLint. */ stdio: "inherit" } )
