import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import { ItemType } from './TypeDefinitions';

type Props = {
    item: ItemType,
    handleCancelViewDetail: Function
}

const ViewDetail: React.FC<Props> = (props) => {
    const initialItemState: ItemType = {
        id: props.item.id,
        name: props.item.name,
        category: props.item.category,
        price: props.item.price,
        in_stock: props.item.in_stock
    }

    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelViewDetail();//call the function handleCancelAdd passed via props
    }

    return (
     <Button onClick={onCancel}> Cancel </Button>
    );
}

export default ViewDetail