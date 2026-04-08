// @ts-check
import fs from 'node:fs'
import { build } from 'esbuild'

fs.rmSync('dist', { recursive: true, force: true })
build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'browser',
	target: 'es2020',
	outdir: 'dist',
	logLevel: 'info',
})
