#!/usr/bin/env node
import { execSync as ejecutar } from "child_process"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/*
=============
= Formatear =
=============
*/
/* Ubicamos el ejecutable de ESLint */ const eslint = join(__dirname, "..", "node_modules", ".bin", "eslint")
/* y su archivo de configuración. */ const configuración = join(__dirname, "..", "eslint.config.js")

/* Y simplemente formateamos */ try {
    /* con ESLint y su configuración */ ejecutar(`"${eslint}" --config "${configuración}" --fix .`, {
        /* desde la carpeta donde se está ejecutando el comando */ cwd: process.cwd(),
        /* y mostramos todo lo que devuelva ESLint. */ stdio: "inherit" } )

/* ESLint puede devolver errores que no pudo corregir */ } catch (error) { if (error.status) { process.exit(error.status)
/* o algún otro tipo de error si no se pudo ejecutar correctamente. */ } else { console.error("Error ejecutando ESLint:", error.message); process.exit(1) } }
