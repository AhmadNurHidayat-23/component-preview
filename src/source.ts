import raw from './primitives.tsx?raw'; import css from './component.css?raw'; import type { Config } from './primitives';
export { css };
export function componentCode(config: Config) {
  return 'import "./component.css";\n' + raw + '\nexport default function GeneratedComponent() {\n  return <PreviewComponent config={' + JSON.stringify(config) + '} />;\n}\n';
}
export const usage = 'import GeneratedComponent from "./GeneratedComponent";\n\nexport default function Example() {\n  return <main><GeneratedComponent /></main>;\n}\n';
