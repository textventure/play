import { branchClass } from '../Branch';
const branchSelector = '.' + branchClass;

/**
 * App styles.
 *
 * @param  {Object} theme
 * @return {Object}
 */
const styles = theme => {
  const { palette, spacing, typography } = theme;
  const { pxToRem } = typography;
  const marginBottom = pxToRem(spacing(2));

  const styles = {
    '@global': {
      [branchSelector]: {
        '& h1': {
          ...typography.h1,
          marginBottom,
        },
        '& h2': {
          ...typography.h2,
          marginBottom,
        },
        '& h3': {
          ...typography.h3,
          marginBottom,
        },
        '& h4': {
          ...typography.h4,
          marginBottom,
        },
        '& h5': {
          ...typography.h5,
          marginBottom,
        },
        '& h6': {
          ...typography.h6,
          marginBottom,
        },
        '& p': {
          ...typography.body2,
          letterSpacing: 'initial',
          marginBottom: pxToRem(spacing(1)),
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
      maxWidth: 720,
    },

    progress: {
      marginTop: spacing(4), // 32px
    },
  };

  return styles;
};

export default styles;
