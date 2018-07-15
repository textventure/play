import { branchClass } from '../Branch';
const branchSelector = '.' + branchClass;

/**
 * App styles.
 *
 * @param  {Object} theme
 * @return {Object}
 */
const styles = theme => {
  const { breakpoints, palette, spacing, typography } = theme;
  const marginBottom = typography.pxToRem(spacing.unit * 1.5); // 12px

  return {
    '@global': {
      [branchSelector]: {
        '& h1': {
          ...typography.display3,
          marginBottom,
        },
        '& h2': {
          ...typography.display2,
          marginBottom,
        },
        '& h3': {
          ...typography.display1,
          marginBottom,
        },
        '& h4': {
          ...typography.headline,
          marginBottom,
        },
        '& h5': {
          ...typography.title,
          marginBottom,
        },
        '& h6': {
          ...typography.subheading,
          marginBottom,
        },
        '& p': {
          ...typography.body1,
          marginBottom,
        },
      },

      code: {
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        border: `1px solid ${palette.grey[400]}`,
        borderRadius: 3,
        padding: '3px 6px',
      },
      em: {
        fontStyle: 'italic',
      },
      main: {
        display: 'block', // fix for IE 9-11
      },
      strong: {
        fontWeight: typography.fontWeightMedium,
      },
    },

    grid: {
      maxWidth: breakpoints.width('sm'), // 600px
    },
  };
};

export default styles;
