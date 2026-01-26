import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	{
		ignores: ["node_modules/**", "dist/**", "build/**"]
	},

	// Backend (NestJS)
	{
		files: ["apps/backend/**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			"@typescript-eslint": tseslint
		},
		rules: {
			...tseslint.configs.recommended.rules
		}
	},

	// Frontend (React)
	{
		files: ["apps/frontend/**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			"@typescript-eslint": tseslint
		},
		rules: {
			...tseslint.configs.recommended.rules
		}
	}
];
