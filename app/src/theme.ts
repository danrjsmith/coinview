export const getCSSVarColor = (cssVarName: string) => {
  const regex = new RegExp(/var\((.*?)\)/g);
  const regexExecArray = regex.exec(cssVarName);
  if (regexExecArray !== null) {
    return getComputedStyle(window.document.body)
      .getPropertyValue(regexExecArray[1])
      .trim();
  }
  return cssVarName;
};

export const theme = {
  palette: {
    primary: {
      main: "var(--palette-primary-main)",
      light: "var(--palette-primary-light)",
      dark: "var(--palette-primary-dark)",
      contrastText: "var(--palette-primary-contrast-text)",
      contrastSuccessText: "var(--palette-primary-contrast-success-text)",
      contrastErrorText: "var(--palette-primary-contrast-error-text)",
    },
    secondary: {
      main: "var(--palette-secondary-main)",
      light: "var(--palette-secondary-light)",
      dark: "var(--palette-secondary-dark)",
      contrastText: "var(--palette-secondary-contrast-text)",
      contrastSuccessText: "var(--palette-secondary-contrast-success-text)",
      contrastErrorText: "var(--palette-secondary-contrast-error-text)",
    },
    text: {
      main: "var(--palette-text-main)",
      light: "var(--palette-text-light)",
      dark: "var(--palette-text-dark)",
    },
    neutral: {
      main: "var(--palette-neutral-main)",
      light: "var(--palette-neutral-light)",
      dark: "var(--palette-neutral-dark)",
      contrastText: "var(--palette-neutral-contrast-text)",
    },
    error: {
      main: "var(--palette-error-main)",
      light: "var(--palette-error-light)",
      dark: "var(--palette-error-dark)",
      contrastText: "var(--palette-error-contrast-text)",
    },
    warning: {
      main: "var(--palette-warning-main)",
      light: "var(--palette-warning-light)",
      dark: "var(--palette-warning-dark)",
      contrastText: "var(--palette-warning-contrast-text)",
    },
    success: {
      main: "var(--palette-success-main)",
      light: "var(--palette-success-light)",
      dark: "var(--palette-success-dark)",
      contrastText: "var(--palette-success-contrast-text)",
    },
  },
  surface: {
    main: "var(--surface-main)",
    light: "var(--surface-light)",
    dark: "var(--surface-dark)",
  },
};
