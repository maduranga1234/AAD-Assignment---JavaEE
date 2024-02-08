
    getAllItem();


$("#ItemSaveBtn").click(function () {
    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }
});

// Save Item
function saveItem() {

    let ItemId = $("#ItemId").val();
    //check customer is exists or not?
    if (searchItem(ItemId.trim()) == undefined) {

        let ItemName = $("#ItemName").val();
        let ItemPrice = $("#UnitPrice").val();
        let ItemQuantity = $("#Qty").val();
        let ItemQlity = $("#Quality").val();


        let newItem = Object.assign({}, item);

        newItem.code = ItemId;
        newItem.name = ItemName;
        newItem.unitPrice = ItemPrice;
        newItem.qtyOnHand = ItemQuantity;
        newItem.qlity=ItemQlity;

        itemDB.push(newItem);
        clearItemInputFields();
        getAllItem();


    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

//delete Item
$("#ItemDeletBtn").click(function () {
    let id = $("#ItemId").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            // clearItemInputFields();
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}


//update  Item
$("#ItemUpdateBtn").click(function () {
    let code = $("#ItemId").val();
    updateItem(code);
    clearItemInputFields();
});

//clear textField
$("#ItemClearBtn").click(function () {
    clearItemInputFields();

});

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No Item find..please check the Code");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);

            let ItemName = $("#ItemName").val();
            let ItemPrice = $("#UnitPrice").val();
            let ItemQuantity = $("#Qty").val();
            let ItemQlity = $("#Quality").val();


            item.name = ItemName;
            item.unitPrice = ItemPrice;
            item.qtyOnHand = ItemQuantity;
            item.qlity = ItemQlity;


            getAllItem();
        }
    }
}

//click table .shire value textField
function bindTrEvents() {

    $(document).on('click', '#ItmTBody > tr', function () {
        let id = $(this).children(':nth-child(1)').text();
        let name = $(this).children(':nth-child(2)').text();
        let price = $(this).children(':nth-child(3)').text();
        let Qty = $(this).children(':nth-child(4)').text();
        let Qlity = $(this).children(':nth-child(5)').text();

        setTextFieldValues(id, name, price,Qty,Qlity);
    });

    function setTextFieldValues(id, name, price, Qty, Qlity) {
        $("#ItemId").val(id);
        $("#ItemName").val(name);
        $("#UnitPrice").val(price);
        $("#Qty").val(Qty);
        $("#Quality").val(Qlity);

    }
}


function getAllItem() {
    $("#ItmTBody").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let itemCode = itemDB[i].code;
        let itemName = itemDB[i].name;
        let itemPrice = itemDB[i].unitPrice;
        let itemQtyOnHand = itemDB[i].qtyOnHand;
        let itemQlity = itemDB[i].qlity;

        let row = `<tr>
                     <td>${itemCode}</td>
                     <td>${itemName}</td>
                     <td>${itemPrice}</td>
                     <td>${itemQtyOnHand}</td>
                     <td>${itemQlity}</td>
                    </tr>`;

        $("#ItmTBody").append(row);
        bindTrEvents();
    }
}