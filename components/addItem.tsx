/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { Box, Button, Container, Form } from 'react-bulma-components';
import { ItemType } from './TypeDefinitions';


//create the type for the anticipated props to be passed from parent component
type Props = {
    handleCreateItem: Function,
    handleCancelCreate: Function
}

const AddItem: React.FC<Props> = (props) => {
    const initialItemState: ItemType = {
        name: '',
        category: 'unclassified',
        price: 0,
        in_stock: 0
    };

    //declare the state variable for item to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange

    const [item, setItem] = useState<ItemType | any>({ ...initialItemState });

    //create a general onChange event handler for form inputs that fire onChange event
    const onChange = (event: any) => {
        const itemState = item;//check out item in state as is

        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        itemState[event.target.name] = event.target.value;
        setItem({ ...itemState });//checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: any) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleCreateItem(item);//call the handleAddItem function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelCreate();//call the function handleCancelAdd passed via props
    }

    //Note where the above functions are used below within the return statement
    return (
        <div className="AddItem">
            <form onSubmit={onSubmit}>
                <fieldset className="">
                    <Container color="danger">
                        <Box>
                            <h5 className="title is-4 has-text-centered">Add Item:</h5>
                            <div className="field">
                                <label className='label'>Category</label>
                                <div className="control">
                                    <div className="select">
                                        <select id="category" name="category" value={item.category} onChange={onChange}>
                                            <option value="Unclassified">Unclassified</option>
                                            <option value="Food">Food</option>
                                            <option value="Drink">Drink</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Electronics">Electronics</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Form.Field>
                                <Form.Label>Name</Form.Label>
                                <Form.Control>
                                    <Form.Input type='text' name='name' id='name' placeholder="name of item ..."
                                        value={item.name} onChange={onChange} required />
                                </Form.Control>
                            </Form.Field>

                            <Form.Field>
                                <Form.Label>Price</Form.Label>
                                <Form.Control>
                                    <Form.Input type='number' name='price' id='price' placeholder="price of item in
                                    naira..." value={item.price} onChange={onChange} required />
                                </Form.Control>

                            </Form.Field>

                            <Form.Field>
                                <Form.Label>In Stock</Form.Label>
                                <Form.Input type='number' name='in_stock' id='in_stock' placeholder="how many in stock"
                                    value={item.in_stock} onChange={onChange} required />
                            </Form.Field>
                            <Button>Submit </Button>
                            <Button onClick={onCancel}> Cancel </Button>
                        </Box>
                    </Container>
                </fieldset>
            </form>
        </div>
    );
}

export default AddItem;