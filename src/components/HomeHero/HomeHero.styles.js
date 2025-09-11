import { keyframes } from '@emotion/react';

const slideInBolide = keyframes`100% { transform: translateX(0%); }`;
const spinFrontTyre = keyframes`0% { transform: translate(333px, -292px) rotate(0deg); } 100% { transform: translate(333px, -292px) rotate(360deg); }`;
const spinBackTyre = keyframes`0% { transform: translate(60px, -292px) rotate(0deg); } 100% { transform: translate(60px, -292px) rotate(360deg); }`;
const spinBackTyreMobile = keyframes`0% { transform: translate(43px, -213px) rotate(0deg); } 100% { transform: translate(43px, -213px) rotate(360deg); }`;
const spinFrontTyreMobile = keyframes`0% { transform: translate(240px, -213px) rotate(0deg); } 100% { transform: translate(240px, -213px) rotate(360deg); }`;

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
    color: mode === 'light' ? '#000000' : '#E2E2E2',
  },
  titleMobile: {
    fontWeight: 900,
    fontSize: '48px',
    textAlign: 'center',
    margin: '10px 0 -40px 0',
    color: mode === 'light' ? '#000000' : '#E2E2E2',
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
    marginBottom: '-30px',
  },
  backTyreContainer: {
    position: 'fixed',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: `${spinBackTyre} 3s linear infinite`,
  },
  frontTyreContainer: {
    position: 'fixed',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    animation: `${spinFrontTyre} 3s linear infinite`,
  },
  backTyreContainerMobile: {
    position: 'fixed',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '87px',
    height: '87px',
    animation: `${spinBackTyreMobile} 3s linear infinite`,
  },
  frontTyreContainerMobile: {
    position: 'fixed',
    backgroundColor: 'black',
    borderRadius: '50%',
    width: '87px',
    height: '87px',
    animation: `${spinFrontTyreMobile} 3s linear infinite`,
  },
  tracksIcon: {
    position: 'fixed',
    zIndex: '-1',
    width: '250px',
    height: '250px',
    transform:
      'translate(-630px, 198px) rotate(-8deg) rotate3d(117, 1, 1, -111deg)',
    color: mode === 'light' ? '#000000' : '#5a5a5a',
  },
  tracksIconMobile: {
    position: 'fixed',
    zIndex: '-1',
    width: '250px',
    height: '250px',
    transform:
      'translate(-521px, 103px) rotate(-8deg) rotate3d(117, 1, 1, -111deg)',
    color: mode === 'light' ? '#000000' : '#5a5a5a',
  },
  imageMobile: {
    height: '370px',
    width: '370px',
  },
});

export default getStyles;
