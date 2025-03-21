import NonStickyFooter from "./non-fixed-footer";
const Footer = () => {
  return (
    <div style={divStyle} className='footer-fixed'>
      <NonStickyFooter />
    </div>
  );
};

const divStyle = {
  position: 'fixed',
  bottom: '0px',
  width: '100%'
}

export default Footer;