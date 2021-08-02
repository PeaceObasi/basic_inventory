/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { Box, Button, Form } from 'react-bulma-components';
import { ItemType } from './TypeDefinitions';

//create the type for the anticipated props to be passed from parent component
type Props = {
    item: ItemType,
    handleUpdateItem: Function,
    handleCancelUpdate: Function
}

//prepare the data for state initialization with current data

const EditItem: React.FC<Props> = (props) => {
    const initialItemState: ItemType = {
        id: props.item.id,
        name: props.item.name,
        category: props.item.category,
        price: props.item.price,
        in_stock: props.item.in_stock
    }
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
        event.preventDefault();//do not do the default form submit to the server. juuDon't do what a form should normally do when submit is clicked e.g submit to a URL, because i want to update the form.
        props.handleUpdateItem(item);//call the handleAddItem function passed via props.
    }
    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelUpdate();//call the function handleCancelAdd passed via props
    }
    return (
        <div className="EditItem">
            <form onSubmit={onSubmit} >
                <fieldset>
                    <Box>
                        <h5 className="title is-5 has-text-centered">Edit Item:</h5>
                        <div className="field">
                            {/**<label htmlFor="id">Id</label>
                                <input type="hidden" name="id" value={item.id} readOnly />*/}
                            <label className="label">Category</label>
                            <div className="control">
                            <div className="select">
                                <select id="category" name="category" value={item.category} onChange={onChange}>
                                    <option selected={item.category === "Unclassified" ? true : false} value="Unclassified">Unclassified</option>
                                    <option selected={item.category === "Food" ? true : false} value="Food">Food</option>
                                    <option selected={item.category === "Drink" ? true : false} value="Drink">Drink</option>
                                    <option selected={item.category === "Clothing" ? true : false} value="Clothing">Clothing</option>
                                    <option selected={item.category === "Electronics" ? true : false} value="Electronics">Electronics </option>
                                    <option selected={item.category === "Toiletries" ? true : false} value="Toiletries">Toiletries</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <Form.Field>
                            <Form.Label>Name</Form.Label>
                            <Form.Control>
                                <Form.Input type='text' name='name' id='name' placeholder="name of item ..." value={item.name} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label >Price</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='price' id='price' placeholder="price of item in naira..."
                                    value={item.price} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field>
                            <Form.Label htmlFor='in_stock'>In Stock</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='in_stock' id='in_stock' placeholder="how many in stock"
                                    value={item.in_stock} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                        <Button>Submit </Button>
                            <Button onClick={onCancel}> Cancel </Button>

                        
                    </Box>
                </fieldset>
            </form>
        </div >

    );
}

export default EditItem;
