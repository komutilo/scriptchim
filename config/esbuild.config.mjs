import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts', 'src/bin.ts'],
  bundle: true,
  platform: 'node',
  target: ['node14'],
  format: 'cjs',
  sourcemap: true,
  outdir: 'dist',
  minify: true,
  external: [],
  tsconfig: './tsconfig.json',
}).catch(() => process.exit(1));
