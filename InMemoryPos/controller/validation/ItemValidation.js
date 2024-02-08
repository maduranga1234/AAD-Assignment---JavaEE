const Item_iD_Check = /^(I00-)[0-9]{3}$/;
const Item_desc_Check = /^[A-Za-z ]{2,}$/;
const Item_Price_Check = /^[0-9]{2,}([.][0-9]{2})?$/;
const Item_Quantity_Check = /^[0-9]{1,}$/;
const Item_qlity_Check = /^[A-Za-z ]{3,}$/;


let itemArray = new Array();
itemArray.push({field: $("#ItemId"), regEx: Item_iD_Check});
itemArray.push({field: $("#ItemName"), regEx: Item_desc_Check});
itemArray.push({field: $("#UnitPrice"), regEx: Item_Price_Check});
itemArray.push({field: $("#Qty"), regEx: Item_Quantity_Check});
itemArray.push({field: $("#Quality"), regEx: Item_qlity_Check});


function clearItemInputFields() {
    $("#ItemId,#ItemName,#UnitPrice,#Qty,#Quality").val("");
    $("#ItemId,#ItemName,#UnitPrice,#Qty,#Quality").css("border", "1px solid #ced4da");
    $("#ItemtId").focus();
    setBtnItem();
}

setBtnItem();

function setBtnItem() {
    $("#ItemDeletBtn").prop("disabled", true);
    $("#ItemUpdateBtn").prop("disabled", true);

    if (checkAllItem()) {
        $("#ItemSaveBtn").prop("disabled", false);
    } else {
        $("#ItemSaveBtn").prop("disabled", true);
    }

    let id = $("#ItemId").val();
    if (searchItem(id) == undefined) {
        $("#ItemDeletBtn").prop("disabled", true);
        $("#ItemUpdateBtn").prop("disabled", true);
    } else {
        $("#ItemDeletBtn").prop("disabled", false);
        $("#ItemUpdateBtn").prop("disabled", false);
    }

}

$("#ItemId,#ItemName,#UnitPrice,#Qty,#Quality").on("keydown keyup", function (e) {
    let indexNo = itemArray.indexOf(itemArray.find((c) => c.field.attr("code") == e.target.code));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(itemArray[indexNo]);

    setBtnItem();

    if (e.key == "Enter") {

        if (e.target.id != itemArray[itemArray.length - 1].field.attr("code")) {
            if (checkValidations(itemArray[indexNo])) {
                itemArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(itemArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "2px solid white");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "2px solid white");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < itemArray.length; i++) {
        if (!checkValidations(itemArray[i])) return false;
    }
    return true;
}