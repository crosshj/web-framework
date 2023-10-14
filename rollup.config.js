import typescript from 'rollup-plugin-typescript';
import filesize from 'rollup-plugin-filesize';
import graphql from '@rollup/plugin-graphql';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import replace from '@rollup/plugin-replace';
//import nodePolyfills from 'rollup-plugin-polyfill-node';
import externals from 'rollup-plugin-node-externals';
import css from 'rollup-plugin-import-css';

export default [
	{
		input: 'src/client/index.ts',
		output: [
			{
				file: 'dist/client.js',
				format: 'cjs',
				sourcemap: true,
				exports: 'named',
				plugins: [filesize()],
			},
		],
		plugins: [
			css({
				output: 'client.css',
			}),
			externals({
				deps: false,
				peerDeps: true,
				devDeps: true,
				builtinsPrefix: 'ignore',
				//packagePath <<<--- useful for server vs client
			}),
			resolve(),
			json(),
			graphql(),
			commonjs(),
			typescript(),
			//nodePolyfills(),
		],
		onwarn(warning, warn) {
			if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
				// ignores 'use client' warnings
				return;
			}
			warn(warning);
		},
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
