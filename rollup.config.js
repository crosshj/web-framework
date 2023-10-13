import typescript from 'rollup-plugin-typescript';
import filesize from 'rollup-plugin-filesize';
import graphql from '@rollup/plugin-graphql';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
	{
		input: 'src/client/index.ts',
		output: [
			{
				file: 'dist/client.js',
				format: 'cjs',
				exports: 'named',
				name: 'awoss_web',
				sourcemap: true,
				strict: false,
				plugins: [filesize()],
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve({
				preferBuiltins: false,
				exportConditions: ['node'],
				browser: true,
				modulesOnly: true,
			}),
			commonjs({
				include: /node_modules/,
				//include: ['./index.js', 'node_modules/**'],
				requireReturnsDefault: 'auto',
			}),
			typescript(),
			graphql(),
			replace({
				'process.env.NODE_ENV': JSON.stringify('development'),
				'process.env.REACT_APP_BASE_URL': '""', // src/client/framework/api.js
				preventAssignment: true,
			}),
			// json(),

			nodePolyfills(), //TODO: but why do node core modules wind up in the build anyways?
		],
		//external: [],
		external: [
			'react',
			'react-dom',
			'react-is',
			'date-fns-tz',
			'date-fns',
			'date-fns/_lib/format/longFormatters',
			'highlight.js',
			'extend',
			'style-to-object',
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
