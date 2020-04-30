module.exports =  {
        parser:  '@typescript-eslint/parser',
        extends:  [ '@pxblue/eslint-config/tsx' ],
        plugins: ["react", "react-hooks"],
        rules: {
            "react-hooks/exhaustive-deps": "off"
        },
        parserOptions:  {
            project: "./tsconfig.json",
        },
        env: {
            browser: true
        }
    };