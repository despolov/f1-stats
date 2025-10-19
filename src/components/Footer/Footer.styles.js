import {
  BRAND_COLOR_LIGHT,
  TEXT_COLOR_SECONDARY_DARK,
  TEXT_COLOR_REVERSED_LIGHT,
  TEXT_COLOR_SECONDARY_LIGHT,
  TEXT_COLOR_SECONDARY_LIGHT_2,
  BACKGROUND_COLOR_DARK_4,
  BACKGROUND_COLOR_DARK_5,
  BACKGROUND_COLOR_DARK_5_HOVER,
  BORDER_COLOR_REVERSED_DARK_2,
} from '../../constants/globalConsts';

const getStyles = () => ({
  footer: {
    backgroundColor: BACKGROUND_COLOR_DARK_4,
    width: '100%',
    padding: '48px 24px 24px',
    marginTop: 'auto',
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    marginBottom: '32px',
    width: '100%',
  },
  tagline: {
    color: BRAND_COLOR_LIGHT,
    fontSize: '14px',
    fontWeight: 500,
    marginTop: '16px',
    marginBottom: '12px',
  },
  aboutText: {
    color: TEXT_COLOR_SECONDARY_DARK,
    fontSize: '13px',
    lineHeight: '1.6',
    marginTop: '12px',
  },
  sectionTitle: {
    color: TEXT_COLOR_REVERSED_LIGHT,
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  featureItem: {
    color: TEXT_COLOR_SECONDARY_DARK,
    fontSize: '13px',
    lineHeight: '1.6',
  },
  icons: {
    color: 'white',
    width: '28px',
    height: '28px',
  },
  githubLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    padding: '12px 16px',
    backgroundColor: BACKGROUND_COLOR_DARK_5,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    border: `1px solid ${BORDER_COLOR_REVERSED_DARK_2}`,
    width: 'fit-content',

    '&:hover': {
      backgroundColor: BACKGROUND_COLOR_DARK_5_HOVER,
      borderColor: BRAND_COLOR_LIGHT,
    },
  },
  githubText: {
    color: TEXT_COLOR_REVERSED_LIGHT,
    fontSize: '14px',
    fontWeight: 500,
  },
  divider: {
    borderBottom: `1px solid ${BORDER_COLOR_REVERSED_DARK_2}`,
    margin: '32px 0 24px',
  },
  disclaimerSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 0 24px',
  },
  disclaimerText: {
    color: TEXT_COLOR_SECONDARY_LIGHT_2,
    fontSize: '11px',
    lineHeight: '1.6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '16px',
    borderTop: `1px solid ${BORDER_COLOR_REVERSED_DARK_2}`,
  },
  copyrightText: {
    color: '#d0d0d2',
    fontSize: '12px',
  },
  versionText: {
    color: TEXT_COLOR_SECONDARY_LIGHT_2,
    fontSize: '11px',
    fontWeight: 500,
    padding: '4px 12px',
    backgroundColor: BACKGROUND_COLOR_DARK_5,
    borderRadius: '4px',
    border: `1px solid ${BORDER_COLOR_REVERSED_DARK_2}`,
  },
  gridItemNoPadding: {
    paddingLeft: '0 !important',
  },
});

export default getStyles;
