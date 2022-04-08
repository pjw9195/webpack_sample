class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('My Plugin', stats => {
        //     console.log('MyPlugin: done')
        // })
        compiler.plugin('emit', (compilation, callback) => {
            const source = compilation.assets["main.js"].source();
            compilation.assets["main.js"].source = () => {
                const banner = [
                    '/**',
                    ' * 이것ㄷ은 배너 플러그인이 처리헌 결과입니다.',
                    ' * Build Date: 20020202',
                ].join('\n');
                return banner + '\n\n' + source;
            }
        })
    }
}

module.exports = MyWebpackPlugin;
