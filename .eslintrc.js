module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        "no-console": "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "eol-last": ["off", "never"], // 文件末尾空行
        "prettier/prettier": "off", // vue的处理，与eol-last有冲突，所以禁用
        // "vue/script-indent": ["warn", 4, { // 对.vue的script标签使用此缩进规则
        //     "baseIndent": 1,
        // }],
        "indent": ["warn", 4, { // 缩进单位
            "SwitchCase": 1, // switch缩进级别
        }],
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    overrides: [ // 禁用对.vue文件的缩进检查
        {
            "files": ["*.vue"],
            "rules": {
                "indent": "off"
            }
        }
    ]
};