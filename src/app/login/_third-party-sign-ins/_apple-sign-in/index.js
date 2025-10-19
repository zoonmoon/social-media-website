import AppleSignin from 'react-apple-signin-auth';

/** Apple Signin button */
const MyAppleSigninButton = () => (
  <AppleSignin
    /** Auth options passed to AppleID.auth.init() */
    authOptions={{
      /** Client ID - eg: 'com.example.com' */
      clientId: 'art.artxpress.app',
      /** Requested scopes, seperated by spaces - eg: 'email name' */
      scope: 'email name',
      /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
      redirectURI: 'https://yourarton.com/auth/callback',
      /** State string that is returned with the apple response */
      state: 'state',
      /** Nonce */
      nonce: 'nonce',
      /** Uses popup auth instead of redirection */
      usePopup: false,
    }} // REQUIRED
    /** General props */
    uiType="dark"
    /** className */
    className="apple-auth-btn"
    /** Removes default style tag */
    noDefaultStyle={false}
    /** Allows to change the button's children, eg: for changing the button text */
    buttonExtraChildren="Continue with Apple"
    /** Extra controlling props */
    /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
    onSuccess={(response) => {}} // default = undefined
    /** Called upon signin error */
    onError={(error) => console.error(error)} // default = undefined
    /** Skips loading the apple script if true */
    skipScript={false} // default = undefined
    /** Apple image props */
    iconProp={{ style: { marginTop: '0px' } }} // default = undefined
    /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
  />
);

export default MyAppleSigninButton;