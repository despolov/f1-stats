import { keyframes } from '@emotion/react';
import {
  TEXT_COLOR_LIGHT,
  TEXT_COLOR_DARK,
  BORDER_COLOR_LIGHT,
  BORDER_COLOR_REVERSED_DARK,
} from '../../constants/globalConsts';

const slideInBolide = keyframes`100% { transform: translateX(0%); }`;
const spinBackTyre = keyframes`0% { transform: translate(38px, -101px) rotate(0deg); } 100% { transform: translate(38px, -101px) rotate(360deg); }`;
const spinFrontTyre = keyframes`0% { transform: translate(496px, -101px) rotate(0deg); } 100% { transform: translate(496px, -101px) rotate(360deg); }`;
const spinBackTyreMobile = keyframes`0% { transform: translate(22px, -62px) rotate(0deg); } 100% { transform: translate(22px, -62px) rotate(360deg); }`;
const spinFrontTyreMobile = keyframes`0% { transform: translate(290px, -62px) rotate(0deg); } 100% { transform: translate(290px, -62px) rotate(360deg); }`;

const getStyles = (mode) => ({
  container: {
    height: '360px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 100px',
  },
  containerMobile: {
    height: '50%',
    padding: '0 10px',
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
    transform: 'translateX(-160%)',
    animation: `${slideInBolide} 2s forwards`,
  },
  imageContainerMobile: {
    zIndex: '1',
    transform: 'translateX(-160%)',
    animation: `${slideInBolide} 2s forwards`,
    margin: '100px 0',
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
    width: '59px',
    height: '59px',
    animation: `${spinBackTyreMobile} 3s linear infinite`,
  },
  frontTyreContainerMobile: {
    position: 'fixed',
    borderRadius: '50%',
    width: '59px',
    height: '59px',
    animation: `${spinFrontTyreMobile} 3s linear infinite`,
  },
  // tracksIcon: {
  //   position: 'fixed',
  //   zIndex: '-1',
  //   width: '250px',
  //   height: '250px',
  //   transform:
  //     'translate(-630px, 198px) rotate(-8deg) rotate3d(117, 1, 1, -111deg)',
  //   color: mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_REVERSED_DARK,
  // },
  // tracksIconMobile: {
  //   position: 'fixed',
  //   zIndex: '-1',
  //   width: '250px',
  //   height: '250px',
  //   transform:
  //     'translate(-521px, 103px) rotate(-8deg) rotate3d(117, 1, 1, -111deg)',
  //   color: mode === 'light' ? BORDER_COLOR_LIGHT : BORDER_COLOR_REVERSED_DARK,
  // },
  image: {
    width: '700px',
  },
  imageMobile: {
    width: '100%',
    marginTop: '15px',
  },
});

export default getStyles;
