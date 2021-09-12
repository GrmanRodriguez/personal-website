export const deviceSizes = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  };
  
export const device = {
    mobileS: `(max-width: ${deviceSizes.mobileS})`,
    mobileM: `(max-width: ${deviceSizes.mobileM})`,
    mobileL: `(max-width: ${deviceSizes.mobileL})`,
    tablet: `(max-width: ${deviceSizes.tablet})`,
    laptop: `(max-width: ${deviceSizes.laptop})`,
    laptopL: `(max-width: ${deviceSizes.laptopL})`,
    desktop: `(max-width: ${deviceSizes.desktop})`,
    desktopL: `(max-width: ${deviceSizes.desktop})`
};