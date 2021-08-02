import React, { useState } from 'react';
import ItemList from './components/itemList';
import { ItemType } from './components/TypeDefinitions';
import AddItem from './components/addItem';
import EditItem from './components/editItem';
import { Button, Container } from 'react-bulma-components';
import ViewDetail from './components/viewdetail';

//for component hierarchy visual testing, we are creating fake inventory items for our App here. //in reality, such data may come from a remote source
const testItems: Array<ItemType> = [ //notice the use of array of ItemType as our type for testItems

  { id: 1, category: 'Food', name: 'Bread', price: 40, in_stock: 40 },
  { id: 2, category: 'Food', name: 'Whole Chicken', price: 1000, in_stock: 10 },
  { id: 3, category: 'Drink', name: 'Coke', price: 50, in_stock: 20 },
  { id: 4, category: 'Toiletries', name: 'Dettol Soap', price: 150, in_stock: 35 },
  { id: 5, category: 'Clothing', name: 'Jeans trouser', price: 3000, in_stock: 15 },
  { id: 6, category: 'Clothing', name: 'Jacket', price: 4000, in_stock: 100 },
  { id: 7, category: 'Electronics', name: 'Sony Xperria XL', price: 40000, in_stock: 3 }
]

//Below is an object type for holding state variable elements.
//We have created a type so that we can have flexibility for itemToEdit 
type CombinedStateType = {
  items: ItemType[],
  onAddItem: boolean,
  onEditItem: boolean,
  itemToEdit: null | ItemType //safe in this way so as to be able to set it to null
}


const App: React.FC = () => {
  //Let's combine flags, items, etc in an object as they will likely be set together from functions like handleAddItem
  const [combinedState, setCombinedState] = useState<CombinedStateType>({ items: testItems, onAddItem: false, onEditItem: false, itemToEdit: null })

  //function that handles Create Item
  const handleCreateItem = (itemToCreate: ItemType) => {
    const currentItems = combinedState.items;

    //Below is makeshift for adding an id to the itemToAdd. This should be generated automatically by the backend when creating //For now I am just using the length of items so far to determine the next id. It will not work well with concurrent usage. itemToCreate.id = currentItems.length + 1;
    currentItems.push(itemToCreate);
    setCombinedState({ ...combinedState, onAddItem: false, items: currentItems });//flag onAddItem as false and update currentItems in the state in one call
  }

  const handleCancelCreate = () => {
    setCombinedState({ ...combinedState, onAddItem: false }); //retain the combinedState as is and then override onAddItem, setting it to false
  }

  const handleDeleteItem = (id: number) => {

    //remove item from state
    const currentItems = combinedState.items;

    //find the index corresponding to the item with the passed id
    const index = currentItems.findIndex((item) => item.id === id);

    currentItems.splice(index, 1);//remove one element starting from the index position. This is removing the element itself //update state with the spliced currentItems
    setCombinedState({ ...combinedState, items: currentItems });//update state overriding currentItems }

  }

  //Edit Item has been flagged.
  const handleEditItem = (id: number) => {

    //get the item to edit
    const currentItems = combinedState.items;
    const index = currentItems.findIndex((item) => item.id === id);
    const item = currentItems[index];

    setCombinedState({
      ...combinedState, onEditItem: true, itemToEdit: item,
      onAddItem: false
    });//set onEditItem to true and itemToEdit

  }

  const handleUpdateItem = (editedItem: ItemType) => {
    //bring down the items in the state for modification.
    const currentItems = combinedState.items;
    //find the item that has the same id as the editedItem's id
    const index = currentItems.findIndex((item) => item.id === editedItem.id);
    //now change the value for that item in items
    currentItems[index] = editedItem;
    //set the state replacing items with the modified one
    //Also set displayUpdateItem flag to false and itemToUpdate to null in state as pending update is now done.
    setCombinedState({ ...combinedState, onEditItem: false, itemToEdit: null });//set onEditItem to true and itemToEdit to empty
  }

  const handleCancelUpdate = () => {
    //simply setState to make displayUpdate disappear
    setCombinedState({ ...combinedState, onEditItem: false, itemToEdit: null });//set onEditItem to true and itemToEdit to empty
  }

  const handleViewDetail = () => {
    setCombinedState({...combinedState})
  }

  //Time to prepare what is returned.
  //check if editItem should be loaded or not since it is conditional loading
  if (combinedState.onEditItem && combinedState.itemToEdit !== null) {
    return (
      <Container>
        {/**<ul>
          <li>
            <Button color="warning" onClick={() => {
              setCombinedState({
                ...combinedState, onAddItem: true, onEditItem: false
              })
            }}>+ Add Item</Button>

          </li*/}
        <div>
          <EditItem item={combinedState.itemToEdit} handleUpdateItem={handleUpdateItem}
            handleCancelUpdate={handleCancelUpdate} />
        </div>
        <div>
          <ItemList items={combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} handleViewDetail={handleViewDetail}/>
        </div>
      </Container>
    )

  } else if (combinedState.onAddItem) {//Display AddItem along with ItemList if onAddItem is true
    return (
      <div className="App">
        <AddItem handleCreateItem={handleCreateItem} handleCancelCreate={handleCancelCreate} />
        {/**<ItemList items={combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} />*/}
      </div>
    )

    } else if (combinedState.onAddItem){

    return(
      <div>
        {/* <ViewDetail handleCancelViewDetail={handleViewDetail}/> */}
      </div>
    )


  } else {//onAddItem is false
    return (
      <Container className="is-full-width">
         <ul>
          <li>
            <Button color="warning" onClick={() => {
              setCombinedState({
                ...combinedState, onAddItem: true, onEditItem: false
              })
            }}>+ Add Item</Button>

          </li>
        </ul> 
        <ItemList items={combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem} handleViewDetail={handleViewDetail} />
      </Container>
    );
  }
}
export default App;
