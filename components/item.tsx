/** This component is for displaying each item in the record,
 passed to it from ItemList */
import React from 'react';
import { Button } from 'react-bulma-components';
import { ItemType } from './TypeDefinitions';

type Props = {
    item: ItemType,
    handleDeleteItem: Function, //props is expected to also contain the function that will handle delete
    handleEditItem: Function, //props is expected to also contain the function that will handle edit
    handleViewDetail: Function
      
}

const Item: React.FC<Props> = (props) => {
    //callback function for delete button onClick event. We could have also embedded this function definition directly rather than define it first here
    const onDeleteItem = () => {
        props.handleDeleteItem(props.item.id); //notice here that we are calling invoking the handleDeleteItem() passed down through props
    };
    const onEditItem = () => {
        props.handleEditItem(props.item.id); //notice here that we are calling invoking the handleUpdateItem() passed down through props
    };
    const onViewDetail = () => {
        props.handleViewDetail(props.item.id)
    }

    return (
        <tr className="">
            <td>{props.item.name}</td>
            <td>{props.item.category}</td>
            <td>{props.item.price}</td>
            <td>{props.item.in_stock}</td>
            <td><Button color="info" onClick={() => alert('Yet to be implemented. Try it yourself!')}>View Detail</Button></td>
            <td><Button color="success" onClick={onEditItem}>Edit</Button></td>
            <td><Button color="danger" onClick={onDeleteItem}>Delete</Button></td>
        </tr>
    );
}
export default Item;