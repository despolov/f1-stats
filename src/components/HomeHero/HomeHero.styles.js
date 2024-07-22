import { keyframes } from '@emotion/react';

const slideInBolide = keyframes`100% { transform: translateX(0%); }`;
const spinFrontTyre = keyframes`0% { transform: translate(333px, -292px) rotate(0deg); } 100% { transform: translate(333px, -292px) rotate(360deg); }`;
const spinBackTyre = keyframes`0% { transform: translate(60px, -292px) rotate(0deg); } 100% { transform: translate(60px, -292px) rotate(360deg); }`;

const getStyles = () => ({
  container: {
    height: '50%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0 100px',
  },
  title: {
    fontWeight: 900,
    fontSize: '62px',
  },
  imageContainer: {
    zIndex: '1',
    transform: 'translateX(-160%)',
    animation: `${slideInBolide} 2s forwards`,
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
  tracksIcon: {
    position: 'fixed',
    zIndex: '-1',
    width: '250px',
    height: '250px',
    transform:
      'translate(-630px, 198px) rotate(-8deg) rotate3d(117, 1, 1, -111deg)',
  },
});

export default getStyles;
