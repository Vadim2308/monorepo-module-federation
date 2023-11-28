import path from 'path';
import {BuildPaths, BuildPlatforms, buildWebpack} from "@packages/build-config";
import packageJson from './package.json';
import webpack from 'webpack';
type Mode = 'production' | 'development'
interface EnvVariables {
    port:number,
    mode:Mode
    analyzer?:boolean
    platform?:BuildPlatforms
}

export default (env:EnvVariables) => {
    const paths:BuildPaths = {
        output:path.resolve(__dirname,'build'),
        entry:path.resolve(__dirname,'src/index.tsx'),
        html:path.resolve(__dirname,'public/index.html'),
        public:path.resolve(__dirname,'public'),
        src:path.resolve(__dirname,'src'),
    }
    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'admin',
        filename: 'remoteEntry.js',
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true, // Эту библиотеку надо загружать сразу, немедленно. Противоположно lazy-load
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        },
    }))

    return config;
}