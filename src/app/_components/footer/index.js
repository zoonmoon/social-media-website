import NonStickyFooter from "./non-fixed-footer";
const Footer = () => {
  return (
    <div style={divStyle} className='footer-fixed'>
      <NonStickyFooter />
    </div>
  );
};

const divStyle = {
  width: '100%',
  position: 'fixed',
  bottom: '0px',
  background: "white"
}

export default Footer;