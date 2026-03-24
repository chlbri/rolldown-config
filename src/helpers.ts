import { rmSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';

export const withoutExtension = (file: string) => {
  return file.slice(0, file.length - extname(file).length);
};

export const cleanupJS = (
  files: Set<string>,
  dir: string,
  sourcemap: boolean,
) => {
  for (const file of files) {
    const withoutExt = withoutExtension(file);
    const rel = relative('src', withoutExt);
    const baseOut = resolve(process.cwd(), dir, rel);

    // #region JS outputs
    console.warn(`Cleaning up ${baseOut}`);

    rmSync(`${baseOut}.js`, { force: true });
    rmSync(`${baseOut}.cjs`, { force: true });
    if (sourcemap) {
      rmSync(`${baseOut}.js.map`, { force: true });
      rmSync(`${baseOut}.cjs.map`, { force: true });
    }

    const REMOVEDS = ['js', 'cjs', 'js.map', 'cjs.map'].map(
      ext => `${baseOut}.${ext}`,
    );

    const endMessage = JSON.stringify(REMOVEDS, null, 2);

    console.warn('removeds ::');
    console.log('***********');
    console.warn(endMessage);
    console.log('***********');
    // #endregion
    // Typings
    // if (emitDeclarations) {
    //   rmSync(`${baseOut}.d.ts`, { force: true });
    //   if (emitDeclarationMap)
    //     rmSync(`${baseOut}.d.ts.map`, { force: true });
    // }
  }
};
