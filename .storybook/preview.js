import { addParameters } from '@storybook/react';

const cssReq = require.context(
  '!!raw-loader! ../../../node_modules/bx-tokens/storybook',
  true,
  /.\.css$/
);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

addParameters({
  designToken: {
    files: {
      css: cssTokenFiles,
    }
  }
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
