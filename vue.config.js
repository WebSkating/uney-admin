/**
 * 一份完整的vue.config.js配置
 * version: vue-cli 3.0
 * 更多用法用法参照 https://github.com/vuejs/vue-cli/tree/dev/docs/config
 * @author: sunch
 */
console.log(process.env.NODE_ENV);

module.exports = {
    //即将部署的应用的基本URL. 
    //默认情况下，Vue CLI假定您的应用程序将部署在域的根目录，例如https://www.my-app.com/。
    //如果您的应用程序部署在子路径中，则需要使用此选项指定该子路径。
    //例如，如果您的应用程序部署在https://www.foobar.com/my-app/，设置baseUrl为'/my-app/'。
    //正确设置此值对于在生产中正确加载静态资产是必要的。
    //该值也可以设置为空字符串（''），以便使用相对路径链接所有资产，并可以在基于文件系统的环境（如Cordova混合应用程序）中使用该捆绑包。
    //需要注意的是，这会强制生成的CSS文件始终放在输出目录的根目录下，以确保CSS中的URL正常工作。
    //::: tip 应该总是使用这里的baseUrl代替去修改webpack的output.publicPath。:::
    baseUrl: process.env.NODE_ENV === 'production' ? '/uney/' : '/',
    //通过命令行运行 vue-cli-service build 生成构建文件的目录。请注意，该文件夹中的文件将在构建之前被删除（可以通过--no-clean在构建时传递来禁用此行为）。
    //::: tip 应该总是使用outputDir而不是修改webpack中的output.path。:::
    outputDir: 'dist',
    //用于放置生成的静态资产（js，css，img，fonts）的目录。
    //::: tip 当从生成的资产中覆盖filename 或 chunkFilename这两个名字时，在此设置的assetsDir将被忽略 :::
    assetsDir: 'assets',
    //以多页模式构建应用程序。每个“页面”都应该有一个相应的JavaScript条目文件。
    pages: undefined,
    //是否使用eslint-loader在开发期间执行lint-on-save 。
    //仅在@vue/cli-plugin-eslint安装时才会考虑此值。
    //设置true为时，eslint-loader只会在webpack的编译过程中发出警告，以免在开发过程中破坏流程。
    //如果您希望它发出错误（即在构建生产时），请将其设置为：lintOnSave: 'error'。
    lintOnSave: false,
    //是否使用包含运行时编译器的Vue核心的构建。将其设置为true允许您使用templateVue组件中的选项，但会为您的应用带来额外的10kb负载。
    runtimeCompiler: false,
    //默认情况下babel-loader忽略其中的所有文件node_modules。如果要使用Babel显式转换依赖关系，可以在此选项中列出它。
    transpileDependencies: [],
    //源代码地图帮助开发人员从已经编译的js文件中定位到项目源代码位置
    //如果您不需要生成源代码地图，则将其设置为 false 可以加快生产构建。
    productionSourceMap: false,
    //将接收ChainableConfig由webpack-chain提供支持的实例的函数。允许对内部webpack配置进行更细粒度的修改。
    //更多配置请参阅 https://github.com/vuejs/vue-cli/blob/dev/docs/guide/webpack.md#simple-configuration
    chainWebpack: () => {},
    //如果值是Object，则它将使用webpack-merge合并到最终配置中。
    //如果值是函数，它将接收已解析的配置（config）作为参数。该函数可以改变配置并返回任何内容，或者返回配置的克隆或合并版本。
    //详细配置请参阅 https://github.com/vuejs/vue-cli/blob/dev/docs/guide/webpack.md#simple-configuration
    //可传入config 例如：config => {}
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else if (process.env.NODE_ENV === 'test') {
            // mutate for test...
        } else {
            // mutate for development...
        }
    },
    //更多配置请参阅 https://github.com/vuejs/vue-cli/blob/dev/docs/guide/css.md#css-modules
    css: {
        //默认值:( true在生产模式下，false否则总是如此）
        //是否将组件中的CSS提取到独立的CSS文件中（而不是在JavaScript中内联并动态注入）。            
        //在构建为Web组件时，默认情况下也会禁用此选项（样式内联并注入shadowRoot）。      
        //构建库时，您也可以将其设置false为避免用户自己导入CSS。  
        //始终禁用提取CSS，development因为它会中断热模块替换。
        extract: true,
        //是否为CSS启用源映射。将此设置为true可能会影响构建性能。
        sourceMap: false,
        //将选项传递给与CSS相关的加载器。
        loaderOptions: {},
        //默认情况下，只有以文件结尾的文件*.module.[ext]才会被视为CSS模块。
        //将此设置为true允许您.module放入文件名并将所有*.(css|scss|sass|less|styl(us)?)文件视为CSS模块。
        modules: false
    },
    //是否使用thread-loader来对Babel或TypeScript的转换。
    parallel: require('os').cpus().length > 1,
    //将选项传递给PWA插件。
    //pwa提供单页应用的一些特殊配置，可以设置webapp在主屏幕显示与打开的样式，如果项目没有载入 @vue/pwa插件则不会起作用
    //例如：pwa将提供iconPaths选项设置favicon的16、32、appleTouchIcon、maskIcon、msTileImage等选项
    //例如：name选项，用作apple-mobile-web-app-title生成的HTML中元标记的值。请注意，您需要进行编辑public/manifest.json才能与之匹配。
    //更多请参阅：https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    //所有的webpack-dev-server选项都被支持。
    //注意：
    //一些选项的值例如host，port以及https可以通过命令行标志被覆盖。
    //某些选项的值例如publicPath和historyApiFallback 他们不应该被修改,他们需要与baseUrl同步，以使开发服务器devServer能够正常工作。

    //更多配置详情请参阅webpack官方文档：https://webpack.js.org/configuration/dev-server/
    devServer: {
        //当open启用时，开发服务器将打开浏览器。
        //node: process.platform
        open: false,
        //此选项设置为true时，会绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到DNS重新绑定攻击。
        disableHostCheck: false,
        //指定要使用的主机。默认情况下这是localhost。如果您希望外部可以访问您的服务器，请像这样指定：0.0.0.0
        host: '0.0.0.0',
        //指定用于侦听请求的端口号
        port: 8080,
        //默认情况下，dev-server将通过HTTP提供。它也可以选择通过HTTPS在HTTP/2上提供：
        https: false,
        //启用热模块替换（请参阅 devServer.hot）,在没有页面刷新的情况下作为构建失败时的后备。
        hotOnly: false,
        //提供在服务器内部的所有其他中间件之前执行自定义中间件的能力。这可用于定义自定义处理程序
        //可传入参数 app
        before: app => {}
    },
    //这是一个没有经过任何模式验证的对象，因此它可以用于将任意选项传递给第三方插件。
    pluginOptions: {}
}