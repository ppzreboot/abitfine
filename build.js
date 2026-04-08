// @ts-check
import fs from 'node:fs'
import { build } from 'esbuild'

fs.rmSync('dist', { recursive: true, force: true })
await build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'browser',
	format: 'esm',
	target: 'es2020',
	outdir: 'dist',
	logLevel: 'info',
})
