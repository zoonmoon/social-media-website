import NonStickyFooter from "./non-fixed-footer";
const Footer = () => {
  return (
    <div style={divStyle} className='footer-fixed'>
      <NonStickyFooter />
    </div>
  );
};

const divStyle = {
  width: '100%'
}

export default Footer;