// @flow

export type StyleModuleMapType = {
  [key: string]: string;
};

export type StyleModuleImportMapType = {
  [key: string]: StyleModuleMapType;
};

export type GenerateScopedNameType = (
  localName: string,
  resourcePath: string
) => string;

export type GenerateScopedNameConfigurationType =
  | GenerateScopedNameType
  | string;

export type HandleMissingStyleNameOptionType = "throw" | "warn" | "ignore";

export interface ReactCssModuleOptions {
  /**
   * Must match webpack context configuration. css-loader inherits context values from webpack. Other CSS module implementations might use different context resolution logic.
   * default process.cwd()
   */
  context?: string;

  /**
   * A RegExp that will exclude otherwise included files e.g., to exclude all styles from node_modules exclude: 'node_modules'
   */
  exclude?: string;
  filetypes?: {
    [key: string]: {
      syntax: string;
      [key: string]: any;
    };
  };
  removeImport?: boolean;
  generateScopedName?: GenerateScopedNameConfigurationType;
  handleMissingStyleName?: HandleMissingStyleNameOptionType;
  attributeNames?: { styleName: string };
  skip?: boolean;
  autoResolveMultipleImports?: boolean;
}

declare const reactCssModulePlugin: (options?: ReactCssModuleOptions) => Plugin;
export default reactCssModulePlugin;
