// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Textarea,
  FormLabel,
  Button,
} from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { v4 as uuid } from 'uuid';

interface FieldProps {
  sdk: FieldExtensionSDK;
}

/** An Collection which represents an list Collection of the repeater app */
interface NewCollection {
  id: string;
  list: [
    {
      name: string;
      value: string;
      image: string;
      category: string;
    }
  ]
}

/** A simple utility function to create a Lor Collection
 * @returns A blank `Lor Collection` with a uuid
*/
function createNew(): NewCollection {
  return {
    id: uuid(),
    list: require('../lor.json')
  };
}

const Dialog = (props: FieldProps) => {


  return (

    <React.Fragment>
      <div
        className="padding marginBottom-1"
        columnGap="spacingXs"
        columns={1}>
        <FormLabel htmlFor="name">New List</FormLabel>

        <Textarea
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            height: "373px",
          }}
          id="someInput"
          name="someInput"
          testId="cf-ui-textarea"
          width='300px'
          willBlurOnEsc
        />
        <Button
          className="marginTop-1"
          buttonType="positive" size="small">Submit</Button>
      </div>
    </React.Fragment>

  )
};

export default Dialog;
