module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "@vue/prettier"
    ],
    "rules": {
        "no-console": 0,
        'prettier/prettier':[
            "warn",
            {
                "printWidth": 120, // 单行最大长度
                "tabWidth": 4, // 缩进空格数
                "trailingComma": "none", // 无尾逗号
                "semi": false, // 禁止在末尾添加分号
                "singleQuote": true, // 使用单引号
            }
        ]
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}
