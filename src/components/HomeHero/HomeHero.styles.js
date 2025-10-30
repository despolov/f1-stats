import { keyframes } from '@emotion/react';
import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const slideInBolide = keyframes`
  0% { transform: translateX(-250%); opacity: 1; }
  100% { transform: translateX(0%); opacity: 1; }
`;
const slideOutAndBack = keyframes`
  0% { transform: translateX(0%); opacity: 1; }
  39% { transform: translateX(250%); opacity: 1; }
  40% { transform: translateX(250%); opacity: 0; }
  41% { transform: translateX(-250%); opacity: 0; }
  42% { transform: translateX(-250%); opacity: 1; }
  100% { transform: translateX(0%); opacity: 1; }
`;
const spinBackTyre = keyframes`0% { transform: translate(38px, -101px) rotate(0deg); } 100% { transform: translate(38px, -101px) rotate(360deg); }`;
const spinFrontTyre = keyframes`0% { transform: translate(496px, -101px) rotate(0deg); } 100% { transform: translate(496px, -101px) rotate(360deg); }`;
const spinBackTyreMobile = keyframes`0% { transform: translate(20px, -57px) rotate(0deg); } 100% { transform: translate(20px, -57px) rotate(360deg); }`;
const spinFrontTyreMobile = keyframes`0% { transform: translate(262px, -57px) rotate(0deg); } 100% { transform: translate(262px, -57px) rotate(360deg); }`;

const getStyles = (mode, isClickAnimating, hasInitialAnimated) => ({
  container: {
    height: '360px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 100px',
    overflow: 'hidden',
  },
  containerMobile: {
    height: '50%',
    padding: '0 10px',
    overflow: 'hidden',
  },
  title: {
    fontWeight: 900,
    fontSize: '62px',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  titleMobile: {
    fontWeight: 900,
    fontSize: '48px',
    textAlign: 'center',
    margin: '10px 0 -40px 0',
    color: mode === 'light' ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK,
  },
  imageContainer: {
    zIndex: '1',
    transform: 'translateX(0%)',
    opacity: !hasInitialAnimated ? 0 : 1,
    animation: isClickAnimating
      ? `${slideOutAndBack} 3s`
      : !hasInitialAnimated
      ? `${slideInBolide} 2s forwards`
      : 'none',
    cursor: 'pointer',
  },
  imageContainerMobile: {
    zIndex: '1',
    transform: 'translateX(0%)',
    opacity: !hasInitialAnimated ? 0 : 1,
    animation: isClickAnimating
      ? `${slideOutAndBack} 3s`
      : !hasInitialAnimated
      ? `${slideInBolide} 2s forwards`
      : 'none',
    margin: '100px 0',
    cursor: 'pointer',
  },
  backTyreContainer: {
    position: 'fixed',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    animation: `${spinBackTyre} 3s linear infinite`,
  },
  frontTyreContainer: {
    position: 'fixed',
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    animation: `${spinFrontTyre} 3s linear infinite`,
  },
  backTyreContainerMobile: {
    position: 'fixed',
    borderRadius: '50%',
    width: '53px',
    height: '53px',
    animation: `${spinBackTyreMobile} 3s linear infinite`,
  },
  frontTyreContainerMobile: {
    position: 'fixed',
    borderRadius: '50%',
    width: '53px',
    height: '53px',
    animation: `${spinFrontTyreMobile} 3s linear infinite`,
  },
  image: {
    width: '700px',
  },
  imageMobile: {
    width: '370px',
    marginTop: '15px',
  },
});

export default getStyles;
