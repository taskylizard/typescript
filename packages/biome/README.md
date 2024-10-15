# @taskylizard/biome-config

![npm (scoped)](https://img.shields.io/npm/v/%40taskylizard/biome-config?logo=npm&logoColor=%23c0caf5%20&label=%20&labelColor=%2316181d&color=%23f7768e&link=https%3A%2F%2Fnpmjs.com%2Fpackage%2F%40taskylizard%2Fbiome-config)

## Usage

### Installation

```bash
npm|yarn|pnpm|bun add -D @biomejs/biome @taskylizard/biome-config
```

Add the `extends` array to your project's `biome.json` file:

```jsonc
// <project-root>/biome.json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": "@taskylizard/biome-config"
  // ...
}
```

Add scripts to your `package.json` if you haven't already:

```jsonc
// <project-root>/package.json
{
    //...
    "scripts": {
            "format": "biome format . --write",
            "lint": "biome lint .",
            "lint:fix": "biome lint . --write",
            "lint:fix:unsafe": "biome lint . --unsafe"
        }
    }
    // ...
}
```

### Visual Studio Code Setup

1. Install the
   [BiomeJS Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
   if you haven't already.

2. Add the following settings to your project's `.vscode/settings.json`, or
   create them anew:

```jsonc
// <project-root>/.vscode/settings.json
{
  // ...
  "[javascript][javascriptreact][typescript][typescriptreact][json][jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
  // ...
}
```

### Rules

The follow rules are enabled by default for a out-of-the-box experience.

<details>
  <summary>a11y</summary>
  - useValidLang — `error` 
	- noAriaHiddenOnFocusable — `error` 
	- noAccessKey — `error` 
	- noAriaUnsupportedElements — `error` 
	- noAutofocus — `error` 
	- noBlankTarget — `error` 
	- noDistractingElements — `error` 
	- noHeaderScope — `error` 
	- noInteractiveElementToNoninteractiveRole — `error` 
	- noNoninteractiveElementToInteractiveRole — `error` 
	- noNoninteractiveTabindex — `error` 
	- noPositiveTabindex — `error` 
	- noRedundantAlt — `error` 
	- noRedundantRoles — `error` 
	- useAltText — `error` 
	- useAnchorContent — `error` 
	- useAriaActivedescendantWithTabindex — `error` 
	- useAriaPropsForRole — `error` 
	- useButtonType — `warn` 
	- useHeadingContent — `error` 
	- useHtmlLang — `error` 
	- useIframeTitle — `error` 
	- useKeyWithClickEvents — `error` 
	- useKeyWithMouseEvents — `error` 
	- useMediaCaption — `error` 
	- useValidAnchor — `error` 
	- useValidAriaProps — `error` 
	- useValidAriaRole — `error` 
	- useValidAriaValues — `error` 
	- noLabelWithoutControl — `error` 
</details>

<details>
  <summary>complexity</summary>
  - useFlatMap — `error` 
	- noThisInStatic — `error` 
	- useSimplifiedLogicExpression — `error` 
	- noExtraBooleanCast — `error` 
	- noMultipleSpacesInRegularExpressionLiterals — `error` 
	- noUselessCatch — `error` 
	- noUselessFragments — `warn` 
	- noUselessLabel — `error` 
	- noUselessLoneBlockStatements — `error` 
	- noUselessRename — `warn` 
	- noUselessTernary — `error` 
	- noWith — `error` 
	- useRegexLiterals — `error` 
	- noUselessStringConcat — `error` 
	- noUselessUndefinedInitialization — `warn` 
	- noExcessiveCognitiveComplexity — `warn` 
</details>

<details>
  <summary>correctness</summary>
  - noChildrenProp — `error` 
	- noConstAssign — `error` 
	- noConstantCondition — `error` 
	- noConstructorReturn — `error` 
	- noEmptyCharacterClassInRegex — `error` 
	- noEmptyPattern — `error` 
	- noGlobalObjectCalls — `error` 
	- noInnerDeclarations — `error` 
	- noInvalidConstructorSuper — `error` 
	- noNewSymbol — `error` 
	- noNonoctalDecimalEscape — `error` 
	- noPrecisionLoss — `error` 
	- noSelfAssign — `error` 
	- noSetterReturn — `error` 
	- noSwitchDeclarations — `error` 
	- noUndeclaredVariables — `error` 
	- noUnreachable — `error` 
	- noUnreachableSuper — `error` 
	- noUnsafeFinally — `error` 
	- noUnsafeOptionalChaining — `error` 
	- noUnusedLabels — `error` 
	- noUnusedVariables — `error` 
	- useArrayLiterals — `error` 
	- useExhaustiveDependencies — `warn` 
	- useHookAtTopLevel — `error` 
	- useIsNan — `error` 
	- useJsxKeyInIterable — `error` 
	- useValidForDirection — `error` 
	- useYield — `error` 
</details>

<details>
  <summary>nursery</summary>
  - noSubstr — `error` 
	- noDuplicateElseIf — `error` 
</details>

<details>
  <summary>security</summary>
  - noDangerouslySetInnerHtmlWithChildren — `error` 
	- noGlobalEval — `error` 
</details>

<details>
  <summary>style</summary>
  - useNumberNamespace — `error` 
	- noArguments — `error` 
	- noCommaOperator — `error` 
	- noDefaultExport — `error` 
	- noImplicitBoolean — `warn` 
	- noNonNullAssertion — `off` 
	- noParameterAssign — `error` 
	- noUselessElse — `warn` 
	- noVar — `error` 
	- useBlockStatements — `off` 
	- useCollapsedElseIf — `warn` 
	- useConst — `warn` 
	- useFilenamingConvention — `See config object in biome.json` 
	- useFragmentSyntax — `warn` 
	- useNodejsImportProtocol — `warn` 
	- useNumericLiterals — `error` 
	- useTemplate — `warn` 
	- noNamespace — `error` 
	- useSelfClosingElements — `error` 
	- useImportType — `warn` 
	- noUnusedTemplateLiteral — `error` 
	- noYodaExpression — `warn` 
	- useConsistentBuiltinInstantiation — `error` 
	- useNamingConvention — `See config object in biome.json` 
</details>

<details>
  <summary>suspicious</summary>
  - noArrayIndexKey — `warn` 
	- noAssignInExpressions — `error` 
	- noAsyncPromiseExecutor — `error` 
	- noCatchAssign — `error` 
	- noClassAssign — `error` 
	- noCommentText — `error` 
	- noCompareNegZero — `error` 
	- noConfusingLabels — `error` 
	- noConsoleLog — `error` 
	- noControlCharactersInRegex — `error` 
	- noDebugger — `error` 
	- noDoubleEquals — `error` 
	- noDuplicateCase — `error` 
	- noDuplicateClassMembers — `error` 
	- noDuplicateJsxProps — `error` 
	- noDuplicateObjectKeys — `error` 
	- noDuplicateParameters — `error` 
	- noEmptyBlockStatements — `error` 
	- noFallthroughSwitchClause — `error` 
	- noFunctionAssign — `error` 
	- noGlobalAssign — `error` 
	- noImportAssign — `error` 
	- noLabelVar — `error` 
	- noMisleadingCharacterClass — `error` 
	- noPrototypeBuiltins — `error` 
	- noRedeclare — `error` 
	- noSelfCompare — `error` 
	- noShadowRestrictedNames — `error` 
	- noUnsafeDeclarationMerging — `warn` 
	- noUnsafeNegation — `error` 
	- useAwait — `error` 
	- useDefaultSwitchClauseLast — `error` 
	- useGetterReturn — `error` 
	- useIsArray — `error` 
	- useValidTypeof — `error` 
	- useNamespaceKeyword — `error` 
	- noEmptyInterface — `error` 
	- noApproximativeNumericConstant — `error` 
	- noSuspiciousSemicolonInJsx — `error` 
</details>
