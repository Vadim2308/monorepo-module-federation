import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({ mode,paths,analyzer,platform}:BuildOptions):Configuration['plugins'] {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins:Configuration['plugins'] = [
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__:JSON.stringify(mode)
        }),
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon:path.resolve(paths.public,'favicon.ico'),
            publicPath:'/', // ! При запросе страницы надо все запрашивать из корня, иначе на микрофронтах при вставке URL, будет ошибка(типа history api fallback). При любом урле нам надо отдать наш html из build
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),
    ]

    if(isDev){
        // plugins.push(new ForkTsCheckerWebpackPlugin())// Выносит проверку типов в отдельный процесс, не нагружая при этом сборку
        plugins.push(new webpack.ProgressPlugin())  // медленный,
        plugins.push(new ReactRefreshWebpackPlugin()) // Нужно для быстрого обновления, без полной перезагрузки страницы
    }

    if(isProd){
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public,'locales'), to: path.resolve( paths.output,'locales') },
            ],
        }))
    }

    if(analyzer){
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
}