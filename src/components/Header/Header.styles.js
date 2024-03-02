const getStyles = () => ({
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  header: {
    background: '#ffffff',
    height: '64px',
    color: '#ffffff',
    borderBottom: '1px solid #E8E8E8',
    borderTop: '3px solid #E10600',
  },
  headerGrid: {
    padding: '0 24px 0 24px',
    height: 'inherit',
  },
  companyLabelPrimary: {
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 400,
    color: '#E10600',
  },
  companyLabelSecondary: {
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 400,
    color: '#666666',
  },
  mainButton: {
    fontSize: '14px',
    lineHeight: '26px',
    fontWeight: 600,
    color: '#666666',
  },
  buttonLink: {
    margin: '0 24px 0 0',
  },
  companyButtonLink: {
    margin: '0 32px 0 0',
  },
});

export default getStyles;
