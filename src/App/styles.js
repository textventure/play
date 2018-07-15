/**
 * App styles.
 *
 * @param  {Object} theme
 * @return {Object}
 */
const styles = theme => {
  const { breakpoints, spacing, typography } = theme;
  const marginBottom = typography.pxToRem(spacing.unit * 1.5); // 12px

  return {
    '@global': {
      h1: {
        ...typography.display3,
        marginBottom,
      },
      h2: {
        ...typography.display2,
        marginBottom,
      },
      h3: {
        ...typography.display1,
        marginBottom,
      },
      h4: {
        ...typography.headline,
        marginBottom,
      },
      h5: {
        ...typography.title,
        marginBottom,
      },
      h6: {
        ...typography.subheading,
        marginBottom,
      },
      p: {
        ...typography.body1,
        marginBottom,
      },
    },

    grid: {
      maxWidth: breakpoints.width('sm'), // 600px
    },
  };
};

export default styles;
