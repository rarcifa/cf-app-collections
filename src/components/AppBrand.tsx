import { Paragraph } from '@contentful/forma-36-react-components';
import React from 'react';

// The AppBrand component 
class AppBrand extends React.Component {
  render() {
    return <>
    <div className="css-10dl36v css-acwcvww">Helper App</div>
    <Paragraph>Source Code: <a href={"#"}>Github</a></Paragraph><br></br>
    </>
  }
}

export default AppBrand