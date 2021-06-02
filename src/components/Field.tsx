import React, { useEffect, useState } from 'react';
import '../style.css'
import 'react-tabs/style/react-tabs.css';
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel 
} from 'react-tabs';
import {
    Button,
    Pill,
    Dropdown,
    DropdownList,
    DropdownListItem,
    TextLink,
    Grid,
    Card,
    Flex,
} from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import Empty from './Empty';
import AppBrand from './AppBrand';

interface DialogProps {
    sdk: FieldExtensionSDK;
}

/** An Item which represents an list item of the repeater app */
interface Item {
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
/** Icons imported from font Awesome */
const grid = <FontAwesomeIcon icon={faTh} />
const list = <FontAwesomeIcon icon={faThList} />


/** A simple utility function to create a 'blank' item
 * @returns A blank `Item` with a uuid
*/
function createStarwars(): Item {
    return {
        id: uuid(),
        list: require('../starwars.json')
    };
}

function createLor(): Item {
    return {
        id: uuid(),
        list: require('../lor.json')
    };
}

/** The Field component is the Repeater App which shows up 
 * in the Contentful field.
 * 
 * The Field expects and uses a `Contentful JSON field`
 */
const Field = (props: DialogProps) => {
    const [collections, setcollections] = useState<Item[]>([]);

    useEffect(() => {
        // This ensures our app has enough space to render
        props.sdk.window.startAutoResizer();

        // Every time we change the value on the field, we update internal state
        props.sdk.field.onValueChanged((value: Item[]) => {
            if (Array.isArray(value)) {
                setcollections(value);
            }
        });
    });

    /** Adds another item to the list */
    const addNewStarwars = () => {
        props.sdk.field.setValue([...collections, createStarwars()]);
    };

    /** Adds another item to the list */
    const addNewLor = () => {
        props.sdk.field.setValue([...collections, createLor()]);
    };

    /** Deletes an item from the list */
    const deleteItem = (item: Item) => {
        props.sdk.field.setValue(collections.filter((i) => i.id !== item.id));
    };

    // Dropdown Function
    const [isOpen, setOpen] = React.useState(false);

    // List of collections 
    const productList = collections.map((item) => (
        item.list.map((i) => (
            <Card className="css-pivbrds" data-test-id="cf-ui-card">
                <Flex
                    className="margin-1"
                    marginLeft="spacingM">
                    <Flex>
                        <div className="css-14jukvq">
                            <img src={i.image} alt="Such Example" data-test-id="image" className="block" />
                        </div>
                    </Flex>
                    <Flex>
                        <section className="css-1phcpb1">
                            <div className="Typography__Typography___1ZUfE" data-test-id="cf-ui-text-container">
                                <h1 className="Heading__Heading___83D3K css-1xd3m0r mbottom" data-test-id="cf-ui-heading">{i.name}</h1>
                                <h2 className="Subheading__Subheading___2mA9j css-1b5bj2l mbottom" data-test-id="cf-ui-subheading">{i.value}</h2>
                            </div>
                        </section>
                    </Flex>
                </Flex>
                <div className="css-zdzpuy">
                    {/* Remove Btn */}
                    <button className="IconButton__IconButton___1_XeU a11y__focus-outline--default___2hwb1 IconButton__IconButton--muted___22_IZ" data-test-id="cf-ui-icon-button" type="button">
                        <span className="TabFocusTrap__TabFocusTrap___39Vty IconButton__IconButton__inner___3fnmT">
                            <svg viewBox="0 0 24 24" width="1em" height="1em" data-test-id="cf-ui-icon" className="Icon__Icon___38Epv Icon__Icon--small___1yGZK undefined IconButton__IconButton__icon___3yZQN"><path d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"></path></svg>
                            <span className="IconButton__IconButton__label___1kp5y helpers__sr-only___3Kv3z">Delete</span>
                        </span>
                    </button>
                </div>
            </Card>
        ))))

    // Grid View of collections 
    const productGrid = collections.map((item) => (item.list.map((i) => (
        <>
        <Card className="css-pivbrds" data-test-id="cf-ui-card">
          <div className="margin-1">
            <div className="css-14jukvqq">
              <img src={i.image} alt="Such Example" data-test-id="image" className="block" />
            </div>
            <section className="css-1phcpb1">
              <div className="Typography__Typography___1ZUfE" data-test-id="cf-ui-text-container">
                <h1 className="truncate Heading__Heading___83D3K css-1xd3m0r" data-test-id="cf-ui-heading">{i.name}</h1>
                <h2 className="truncate Subheading__Subheading___2mA9j css-1b5bj2l" data-test-id="cf-ui-subheading">{i.value}</h2>
              </div>
            </section>
            <div className="css-zdzpuy">
              {/* Remove Btn */}
              <button className="IconButton__IconButton___1_XeU a11y__focus-outline--default___2hwb1 IconButton__IconButton--muted___22_IZ" data-test-id="cf-ui-icon-button" type="button">
                <span className="TabFocusTrap__TabFocusTrap___39Vty IconButton__IconButton__inner___3fnmT">
                  <svg viewBox="0 0 24 24" width="1em" height="1em" data-test-id="cf-ui-icon" className="Icon__Icon___38Epv Icon__Icon--small___1yGZK undefined IconButton__IconButton__icon___3yZQN"><path d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"></path></svg>
                  <span className="IconButton__IconButton__label___1kp5y helpers__sr-only___3Kv3z">Delete</span>
                </span>
              </button>
            </div>
          </div>
        </Card>
        </>
        ))))
        
    return (
        <>
            {/** app brand logo */}
            <AppBrand/>

            {/** if List not empty then */}
            {!collections.length ? <>
            
            {/** emppty placeholder */}
            <Empty/>

            {/** list selection dropdown */}
            <Dropdown
                className="marginL"
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                toggleElement={
                    <Button
                        size="small"
                        buttonType="muted"
                        indicateDropdown
                        onClick={() => setOpen(!isOpen)}>                        
                        Trigger Dropdown
                    </Button>
                }>
                <DropdownList>
                    <DropdownListItem
                        onClick={addNewStarwars}>
                        Starwars
                    </DropdownListItem>
                    <DropdownListItem
                        onClick={addNewLor}>
                        Lord of the Rings
                    </DropdownListItem>
                </DropdownList>
                <DropdownList border="top">
                    <DropdownListItem>
                        <TextLink icon="Plus">Add List</TextLink>
                    </DropdownListItem>
                </DropdownList>
            </Dropdown>

            {/** else if List is empty then */}
            </> : <>

            {/** list/grid views */}
            <Tabs>
                <TabList>
                    <Tab>{list}</Tab>
                    <Tab>{grid}</Tab>
                </TabList>
                <TabPanel>
                    {/* Objects List */}
                    <Grid columns="1fr"rowGap="spacingM">
                        {productList}
                    </Grid>
                </TabPanel>
                <TabPanel>
                    {/* Objects Grid */}
                    <Grid columns="2fr 2fr 2fr 2fr"rowGap="spacingM">
                        {productGrid}
                    </Grid>
                </TabPanel>
            </Tabs>

            {/** remove list loop */}
            {collections.map((item) => (
                <Pill
                    testId="pill-item"
                    className="marginTop-1"
                    label={collections[0].list[0].category}
                    onClose={() => deleteItem(item)}
                />
            ))} </>
            /** end loop */
            }
        </>
    );
};

export default Field;

