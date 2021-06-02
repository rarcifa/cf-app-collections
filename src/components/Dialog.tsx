// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Paragraph, TextField, Button, Card, Typography, Dropdown, DropdownList, DropdownListItem } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface DialogProps {
  sdk: FieldExtensionSDK;
}

const Dialog = (props: DialogProps) => {
  const params = props.sdk.parameters.invocation.items
  console.log(params)
  console.log(props.sdk.dialogs)

  useEffect(() => {
    // This ensures our app has enough space to render
    props.sdk.window.startAutoResizer();
  }); 


  return (

    <> 
    {params.map((item) => (
      <>
        <div>{item.id}</div>
        {item.list.map((list) => (
          <div>{list.name}</div>
        ))}
      </>

    ))}</>

  )
};

export default Dialog;
