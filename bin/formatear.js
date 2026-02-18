#!/usr/bin/env node
import { execSync as ejecutar } from "child_process"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { readFileSync, existsSync } from "fs"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/*
=============
= Formatear =
=============
*/
/* Primero ubicamos el ejecutable de ESLint */ const eslint = join(__dirname, "..", "node_modules", ".bin", "eslint")
/* y su archivo de configuración. */ const configuración = join(__dirname, "..", "eslint.config.js")

/* A veces se nos indica en el archivo .ignorado_por_el_formateador que */ const archivo_de_ignorados = join(process.cwd(), ".ignorado_por_el_formateador")
/* ciertos archivos o carpetas deben ser ignorados. */ let patrones_a_ignorar = []

/* En ese caso, */ if (existsSync(archivo_de_ignorados)) {
    /* el archivo */ const contenido = readFileSync(archivo_de_ignorados, "utf8")
    /* tendrá un patrón por línea. */ patrones_a_ignorar = contenido.split("\n").map(linea => linea.trim())
        /* Las líneas que comiencen con # son comentarios. */ .filter(linea => linea && !linea.startsWith("#")) }

/* Compliamos */ let ignorados = ""
/* los patrones */ if (patrones_a_ignorar.length > 0) {
    /* a ignorar. */ ignorados = patrones_a_ignorar.map(pattern => `--ignore-pattern "${pattern}"`).join(" ") }

/* Y finalmente, formateamos */ try {
    /* con ESLint y su configuración */ ejecutar(`"${eslint}" --config "${configuración}" --fix ${ignorados} .`, {
        /* desde la carpeta donde se está ejecutando el comando */ cwd: process.cwd(),
        /* y mostramos todo lo que devuelva ESLint. */ stdio: "inherit" } )

/* ESLint puede devolver errores que no pudo corregir */ } catch (error) { if (error.status) { process.exit(error.status)
/* o algún otro tipo de error si no se pudo ejecutar correctamente. */ } else { console.error("Error ejecutando ESLint:", error.message); process.exit(1) } }
