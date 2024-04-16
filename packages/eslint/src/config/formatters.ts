import { isPackageExists } from 'local-pkg'
import {
  GLOB_ASTRO,
  GLOB_CSS,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS
} from '../glob'
import { ensurePackages, interopDefault, parserPlain } from '../utils'
import type {
  OptionsFormatters,
  StylisticConfig,
  TypedFlatConfigItem,
  PrettierOptions
} from '../types'
import { StylisticConfigDefaults } from './stylistic'

export async function formatters(
  options: OptionsFormatters | true = {},
  stylistic: StylisticConfig = {}
): Promise<TypedFlatConfigItem[]> {
  if (options === true) {
    options = {
      astro: isPackageExists('astro'),
      css: true,
      html: true,
      markdown: true
    }
  }

  await ensurePackages([
    'eslint-plugin-format',
    options.astro ? 'prettier-plugin-astro' : undefined
  ])

  const { indent, quotes, semi } = {
    ...StylisticConfigDefaults,
    ...stylistic
  }

  const prettierOptions: PrettierOptions = Object.assign(
    {
      endOfLine: 'auto',
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab'
    } satisfies PrettierOptions,
    options.prettierOptions || {}
  )

  const pluginFormat = await interopDefault(import('eslint-plugin-format'))

  const configs: TypedFlatConfigItem[] = [
    {
      name: 'tasky/formatter/setup',
      plugins: {
        format: pluginFormat
      }
    }
  ]

  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain
        },
        name: 'tasky/formatter/css',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'css'
            }
          ]
        }
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain
        },
        name: 'tasky/formatter/scss',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'scss'
            }
          ]
        }
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain
        },
        name: 'tasky/formatter/less',
        rules: {
          'format/prettier': [
            'error',
            {
              ...prettierOptions,
              parser: 'less'
            }
          ]
        }
      }
    )
  }

  if (options.html) {
    configs.push({
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain
      },
      name: 'tasky/formatter/html',
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: 'html'
          }
        ]
      }
    })
  }

  if (options.markdown) {
    configs.push({
      files: [GLOB_MARKDOWN],
      languageOptions: {
        parser: parserPlain
      },
      name: 'tasky/formatter/markdown',
      rules: {
        ['format/prettier']: [
          'error',
          {
            printWidth: 120,
            ...prettierOptions,
            embeddedLanguageFormatting: 'off',
            parser: 'markdown'
          }
        ]
      }
    })
  }

  if (options.astro) {
    configs.push({
      files: [GLOB_ASTRO],
      languageOptions: {
        parser: parserPlain
      },
      name: 'tasky/formatter/astro',
      rules: {
        'format/prettier': [
          'error',
          {
            ...prettierOptions,
            parser: 'astro',
            plugins: ['prettier-plugin-astro']
          }
        ]
      }
    })
  }

  return configs
}
