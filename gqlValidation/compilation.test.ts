import path from 'path';
import { expect } from 'chai';
import { compileGqlAst, ABSOLUTE_ROOT_DIR, getGqlFiles } from './utils';

describe('Compilation', async () => {
  const gqlFiles = await getGqlFiles();
  gqlFiles.forEach(({ dir, file }) => {
    describe(path.resolve(dir, file).replace(ABSOLUTE_ROOT_DIR, 'components'), () => {
      it(`must compile`, async () => {
        const queryFilePath = path.resolve(dir, file);
        const queryAst = compileGqlAst(queryFilePath);
        expect(queryAst).to.be.not.empty;
      });
    });
  });
});
