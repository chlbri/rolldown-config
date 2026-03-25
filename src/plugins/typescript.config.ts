import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import ts from 'typescript';

const _readFile = (filePath: string): string | undefined => {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch {
    return undefined;
  }
};

const _readDirectory: ts.ParseConfigHost['readDirectory'] = (
  rootDir,
  extensions,
  _,
  __,
  depth,
): string[] => {
  const results: string[] = [];

  const walk = (dir: string, currentDepth: number) => {
    if (depth !== undefined && currentDepth > depth) return;

    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        walk(fullPath, currentDepth + 1);
      } else if (
        !extensions ||
        extensions.some(ext => entry.endsWith(ext))
      ) {
        results.push(fullPath);
      }
    }
  };

  walk(rootDir, 0);
  return results;
};

const _host: ts.ParseConfigHost = {
  useCaseSensitiveFileNames: true,
  readDirectory: _readDirectory,
  fileExists: existsSync,
  readFile: _readFile,
};

export const readTsConfig = (path: string) => {
  const configFile = ts.readConfigFile(path, _readFile);

  if (configFile.error) {
    throw new Error(
      ts.formatDiagnostic(configFile.error, {
        getCanonicalFileName: f => f,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => '\n',
      }),
    );
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    _host,
    resolve(path.split('/').slice(0, -1).join('/')),
  );

  return parsedConfig;
};
