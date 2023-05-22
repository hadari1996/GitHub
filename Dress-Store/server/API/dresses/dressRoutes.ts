import express from "express";
import { addDresses, deleteDress, getAllDresses,getDressSizes,getInventoryToUpdate , getMyDress, insertToRenting, searchDress, setSizeQuantity, updateInventory } from "./dressCtrl";


const router=express.Router();

router


.get('/get-all-dresses', getAllDresses)
.get('/search-dress/:name', searchDress)
.post('/add-dresses',addDresses )
.post('/set-size-quantity/:dress_id', setSizeQuantity )
.get('/get-inventory/:dress_id', getInventoryToUpdate )
.get('/:dress_id/sizes', getDressSizes)
.patch('/:dress_id', updateInventory)
.delete('/delete-dress/:nameDress', deleteDress)
.post('/add-cart-dress/:nameDress', insertToRenting )
.get('/get-my-dress/:userId', getMyDress)
export default router;