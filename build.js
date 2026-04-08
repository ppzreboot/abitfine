// @ts-check
import fs from 'node:fs'
import { build } from 'esbuild'

fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist')
fs.copyFileSync('index.ts', 'dist/index.d.ts')
await build({
	entryPoints: ['index.ts'],
	bundle: true,
	platform: 'browser',
	format: 'esm',
	target: 'es2020',
	outdir: 'dist',
	logLevel: 'info',
})
