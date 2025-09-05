// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      // regra de uso de 'any'
      '@typescript-eslint/no-explicit-any': 'off',
      // regra de promessas flutuantes
      '@typescript-eslint/no-floating-promises': 'warn',
      // regra de argumentos inseguros
      '@typescript-eslint/no-unsafe-argument': 'error',
      // regra de prefixo em interfaces
      '@typescript-eslint/interface-name-prefix': 'off',
      // regra de tipo de retorno explícito em funções
      '@typescript-eslint/explicit-function-return-type': 'off',
      // regra de tipos explícitos em limites de módulo
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
)
