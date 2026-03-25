import type { RolldownPluginOption } from 'rolldown';
import ts from 'typescript';
import { DEFAULT_DIR } from '../constants';
import { toArray } from '#utils';
import { readTsConfig } from './typescript.config';
import { existsSync } from 'node:fs';

type Props = {
  exclude?: string | string[];
  include?: Record<string, string>;
  declarationMap?: boolean;
};

export const typescript = ({
  exclude,
  include,
  declarationMap,
}: Props = {}): RolldownPluginOption => {
  let done = false;

  return {
    name: 'bemedev-dts',
    options(opts) {
      const existing = toArray(opts.external).filter(
        v => typeof v === 'string' || v instanceof RegExp,
      );
      opts.external = [...existing, 'source-map-support'];
      return opts;
    },
    closeBundle: {
      order: 'pre',
      handler() {
        if (done) return;
        const cwd = process.cwd();

        const tsconfigPath = ts.findConfigFile(
          cwd,
          existsSync,
          'tsconfig.json',
        )!;

        const configFile = readTsConfig(tsconfigPath);
        const host = ts.createCompilerHost({});

        const parsed = ts.parseJsonConfigFileContent(
          {
            ...configFile,
            include,
            exclude: [...toArray(exclude), '*.ts'],
            compilerOptions: {
              ...configFile.options,
              rootDir: './src',
              outDir: DEFAULT_DIR,
              noEmit: false,
              emitDeclarationOnly: true,
              declaration: true,
              declarationMap,
            },
          },
          ts.sys,
          cwd,
        );

        const program = ts.createProgram(
          parsed.fileNames,
          parsed.options,
          // host,
        );

        const emitResult = program.emit();

        const errors = ts
          .getPreEmitDiagnostics(program)
          .concat(emitResult.diagnostics)
          .filter(d => d.category === ts.DiagnosticCategory.Error);

        if (errors.length > 0) {
          console.error(
            ts.formatDiagnosticsWithColorAndContext(errors, host),
          );
        }

        done = true;
        console.log('DTS generation complete');
      },
    },
  };
};
