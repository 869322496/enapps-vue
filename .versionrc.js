//发布应用 生成commit日志记录。

module.exports = {
  types: [
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    { type: 'init', section: '📦️ Init | 初始化' },
    { type: 'docs', section: '📝 Documentation | 文档' },
    { type: 'style', section: '🌈 Styles | 风格' },
    { type: 'refactor', section: '🔄 Code Refactoring | 代码重构' },
    { type: 'perf', section: '🚀 Performance Improvements | 性能优化' },
    { type: 'test', section: '🧪 Tests | 测试' },
    { type: 'revert', section: '↩️ Revert | 回退' },
    { type: 'build', section: '📦️ Build System | 打包构建' },
    { type: 'update', section: '⚙️ update | 构建/工程依赖/工具升级' },
    { type: 'tool', section: '🛠️ tool | 工具升级' },
    { type: 'ci', section: '⚙️ Continuous Integration | CI 配置' },
  ],
};
