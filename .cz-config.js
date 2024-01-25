// 在根目录下创建.cz-config.js
module.exports = {
  types: [
    { value: 'feat', name: '功能:     ✨  新增功能', emoji: ':sparkles:' },
    { value: 'fix', name: '修复:     🐛  修复缺陷', emoji: ':bug:' },
    { value: 'docs', name: '文档:     📝  文档变更', emoji: ':memo:' },
    {
      value: 'style',
      name: '格式:     🌈  代码格式（不影响功能，例如空格、分号等格式修正）',
      emoji: ':lipstick:',
    },
    {
      value: 'refactor',
      name: '重构:     🔄  代码重构（不包括 bug 修复、功能新增）',
      emoji: ':recycle:',
    },
    { value: 'perf', name: '性能:     🚀  性能优化', emoji: ':zap:' },
    {
      value: 'test',
      name: '测试:     🧪  添加疏漏测试或已有测试改动',
      emoji: ':white_check_mark:',
    },
    {
      value: 'build',
      name: '构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）',
      emoji: ':package:',
    },
    { value: 'ci', name: '集成:     ⚙️  修改 CI 配置、脚本', emoji: ':ferris_wheel:' },
    { value: 'revert', name: '回退:     ↩️  回滚 commit', emoji: ':rewind:' },
    {
      value: 'chore',
      name: '其他:     🛠️  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）',
      emoji: ':hammer:',
    },
  ],
  useEmoji: true,
  emojiAlign: 'center',
  useAI: false,
  aiNumber: 1,
  themeColorCode: '',
  scopes: [],
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlign: 'bottom',
  customScopesAlias: 'custom',
  emptyScopesAlias: 'empty',
  upperCaseSubject: false,
  markBreakingChangeMode: false,
  breaklineNumber: 100,
  breaklineChar: '|',
  issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
  customIssuePrefixAlign: 'top',
  emptyIssuePrefixAlias: 'skip',
  customIssuePrefixAlias: 'custom',
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  minSubjectLength: 0,
  scopeOverrides: undefined,
  defaultBody: '',
  defaultIssues: '',
  defaultScope: '',
  defaultSubject: '',
  messages: {
    type: '选择一种你期望的提交类型(type):',
    // scope: '选择一个更改的范围(scope) (可选):',
    // used if allowCustomScopes is true
    // customScope: 'Denote the SCOPE of this change:',
    subject: '输入本次commit记录说明:\n',
    // body: '长说明，使用"|"换行(可选)：\n',
    // breaking: '非兼容性说明 (可选):\n',
    // footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],
  allowBreakingChanges: ['fix', 'feat', 'update', 'refactor', 'perf', 'build', 'revert'],
  subjectLimit: 100,
};