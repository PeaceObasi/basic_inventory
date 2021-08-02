import React from 'react';
import { ItemType } from './TypeDefinitions';
import ItemListHeader from './itemListHeader';
import Item from './item';

//declare type for Props passed to this
type Props = {
    items: Array<ItemType>
    handleDeleteItem: Function //not used in this component, but only for passing same function to the next layer, Item
    handleEditItem: Function, 
    handleViewDetail: Function
}

const ItemList: React.FC<Props> = (props) => {
    //prepare items for display in a table
    let itemListRows = null;
    itemListRows = props.items.map((item) => {
        return <Item item={item} handleDeleteItem={props.handleDeleteItem} handleEditItem={props.handleEditItem} handleViewDetail={props.handleViewDetail} /> //pass item to Item component each time
    });

    return (
        <div className="is-justify-content-center">
            <h1 className="title is-1 has-text-centered"> Inventory Items</h1>
<br></br>
            <table className="table is-full-width is-striped is-bordered">
                <ItemListHeader/>
                {itemListRows}
        </table>
        </div>
    );
}

    export default ItemList;