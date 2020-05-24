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
  const marginBottom1 = pxToRem(spacing(1));
  const marginBottom2 = pxToRem(spacing(2));

  return {
    '@global': {
      [branchSelector]: {
        '& h1': {
          ...typography.display3,
          marginBottom: marginBottom2,
        },
        '& h2': {
          ...typography.display2,
          marginBottom: marginBottom2,
        },
        '& h3': {
          ...typography.display1,
          marginBottom: marginBottom2,
        },
        '& h4': {
          ...typography.headline,
          marginBottom: marginBottom2,
        },
        '& h5': {
          ...typography.title,
          marginBottom: marginBottom2,
        },
        '& h6': {
          ...typography.subheading,
          marginBottom: marginBottom2,
        },
        '& p': {
          ...typography.body1,
          marginBottom: marginBottom1,
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
};

export default styles;
