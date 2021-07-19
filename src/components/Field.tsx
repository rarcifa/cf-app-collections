// @ts-nocheck
import React, { useEffect, useState } from 'react';
import '../style.css'
import 'react-tabs/style/react-tabs.css';
import {
    Tab,
    Tabs,
    TabList,
    TabPanel,
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
    Modal
} from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faThList } from '@fortawesome/free-solid-svg-icons';
import Empty from './Empty';
import AppBrand from './AppBrand';
import Selector from './Selector';

interface DialogProps {
    sdk: FieldExtensionSDK;
}

/** An Collection which represents an list Collection of the repeater app */
interface Collection {
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

/** A simple utility function to create a Starwars Collection
 * @returns A blank `Starwars Collection` with a uuid
*/
function createStarwars(): Collection {
    return {
        id: uuid(),
        list: require('../starwars.json')
    };
}

/** A simple utility function to create a Lor Collection
 * @returns A blank `Lor Collection` with a uuid
*/
function createLor(): Collection {
    return {
        id: uuid(),
        list: require('../lor.json')
    };
}

/** A simple utility function to create a Recipe Collection
 * @returns A blank `Lor Collection` with a uuid
*/
function createRecipes(): Collection {
    return {
        id: uuid(),
        list: require('../recipes.json')
    };
}

/** The Field component is the Repeater App which shows up 
 * in the Contentful field.
 * 
 * The Field expects and uses a `Contentful JSON field`
 */
const Field = (props: DialogProps) => {
    const [collections, setcollections] = useState<Collection[]>([]);

    useEffect(() => {
        // This ensures our app has enough space to render
        props.sdk.window.startAutoResizer();

        // Every time we change the value on the field, we update internal state
        props.sdk.field.onValueChanged((value: Collection[]) => {
            if (Array.isArray(value)) {
                setcollections(value);
            }
        });
    });

    /** Adds Starwars Collection to the list */
    const addNewStarwars = () => {
        props.sdk.field.setValue([...collections, createStarwars()]);
    };

    /** Adds Lor Collection to the list */
    const addNewLor = () => {
        props.sdk.field.setValue([...collections, createLor()]);
    };

    /** Adds Lor Collection to the list */
    const addNewRecipe = () => {
        props.sdk.field.setValue([...collections, createRecipes()]);
    };

    /** Deletes an Collection from the list */
    const deleteCollection = (Collection: Collection) => {
        props.sdk.field.setValue(collections.filter((i) => i.id !== Collection.id));
    };

    // Dropdown Function
    const [isOpen, setOpen] = React.useState(false);

    // List of collections 
    const productList = collections.map((Collection) => (
        Collection.list.map((i) => (
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
    const productGrid = collections.map((Collection) => (Collection.list.map((i) => (
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

    // Modal to setup new List via the modal view
    const [isShown, setShown] = React.useState(false);

    const [show, setShow] = React.useState(false);

    const [values, setValue] = useState('');

    console.log(values)
    // return starts here
    return (
        <div className="margin">
            {/** app brand logo */}
            <AppBrand />

            {/** if List not empty then */}
            {!collections.length ? <>

                {/** emppty placeholder */}
                <Empty />

                {/** list selection dropdown */}
                <Dropdown
                    className="margin-auto"
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

                    {/** Default Collections */}
                    <DropdownList>
                        <DropdownListItem
                            onClose={() => setOpen(false)}
                            onClick={() => { addNewStarwars(true); setOpen(false) }}>
                            Starwars
                        </DropdownListItem>
                        <DropdownListItem
                            onClick={() => { addNewLor(true); setOpen(false) }}>
                            Lord of the Rings
                        </DropdownListItem>
                        <DropdownListItem
                            onClick={() => { addNewRecipe(true); setOpen(false) }}>
                            Recipes
                        </DropdownListItem>
                    </DropdownList>

                    {/** Upload new Collection */}
                    <DropdownList border="top">
                        <DropdownListItem

                            onClick={() => { setShown(true); setOpen(false); }}>
                            <TextLink icon="Plus">Add List</TextLink>
                        </DropdownListItem>
                    </DropdownList>
                </Dropdown>

                {/** modal add list option */}
                <Modal
                    size="fullWidth"
                    title="Centered modal" isShown={isShown}>
                    {() => (
                        <React.Fragment>
                            <Modal.Header title="Add List" />
                            <Modal.Content>
                                <Grid columns="1fr 1fr 1fr" rowGap="spacingM" columnGap="spacingM">
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        marginRight="spacingM">
                                        <Card onClick={() => { setShow(!show); setValue('starwars') }}>
                                            <img
                                                style={{ borderRadius: "6px 6px 0px 0px", width: "143px", height: "200px" }}
                                                src="data:image/jpeg;base64,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">
                                            </img>
                                            <div role="img" aria-label="sparkles" style={{ margin: "7px", marginTop: "0px" }}>
                                                Starwars
                                            </div>
                                        </Card>
                                    </Flex>
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        marginRight="spacingM">
                                        <Card onClick={() => { setShow(!show); setValue('lor') }}>
                                            <img
                                                style={{ borderRadius: "6px 6px 0px 0px", width: "143px", height: "200px" }}
                                                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT9J7XACn3tlD6v4UXRMvT2wJN8FGCCPeh8U3RkZ6__tR4wGhSo">
                                            </img>
                                            <div role="img" aria-label="sparkles" style={{ margin: "7px", marginTop: "0px" }}>
                                                Lord of the Rings
                                            </div>
                                        </Card>
                                    </Flex>
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        marginRight="spacingM">
                                        <a className="darklayer">
                                            <Card onClick={() => { setShow(!show); setValue('recipes') }}>
                                                <img
                                                    style={{ borderRadius: "6px 6px 0px 0px", width: "143px", height: "200px" }}
                                                    src="https://cookieandkate.com/images/2021/05/broccoli-pesto-pasta-recipe-1.jpg">
                                                </img>
                                                <div role="img" aria-label="sparkles" style={{ margin: "7px", marginTop: "0px" }}>
                                                    Recepis
                                                </div>
                                            </Card>
                                        </a>
                                    </Flex>
                                </Grid>
                            </Modal.Content>
                            <Modal.Controls>
                                <Button buttonType="positive" onClick={() => {
                                    setShown(false);
                                    if (values === 'starwars') {
                                        addNewStarwars(true); setOpen(false)
                                    } else if (values === 'lor') {
                                        addNewLor(true); setOpen(false)
                                    } else if (values === 'recipes') {
                                        addNewRecipe(true); setOpen(false)
                                    }
                                }}>
                                    Confirm
                                </Button>

                                <Button buttonType="muted" onClick={() => setShown(false)}>
                                    Close
                                </Button>
                            </Modal.Controls>
                        </React.Fragment>
                    )}
                </Modal>

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
                        <Grid columns="1fr" rowGap="spacingM">
                            {productList}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        {/* Objects Grid */}
                        <Grid columns="2fr 2fr 2fr 2fr" rowGap="spacingM">
                            {productGrid}
                        </Grid>
                    </TabPanel>
                </Tabs>

                {/** remove list loop */}
                {collections.map((Collection) => (
                    <Pill
                        testId="pill-Collection"
                        className="marginTop-1"
                        label={collections[0].list[0].category}
                        onClose={() => deleteCollection(Collection)}
                    />
                ))} </>
                /** end loop */
            }
        </div>
    );
};

export default Field;

