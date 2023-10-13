import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import gzipPlugin from 'rollup-plugin-gzip';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'src/client/index.ts',
		output: [
			{
				file: 'dist/client.js',
				format: 'cjs',
				exports: 'named',
				sourcemap: true,
				strict: false,
				plugins: [terser(), gzipPlugin(), filesize()],
			},
		],
		plugins: [typescript()],
		external: ['react', 'react-dom'],
	},
	{
		input: 'src/server/index.ts',
		output: [
			{
				file: 'dist/server.js',
				format: 'cjs',
				exports: 'named',
				sourcemap: true,
				strict: false,
				plugins: [filesize()],
			},
		],
		plugins: [typescript()],
		external: [],
	},
];
