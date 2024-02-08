//load all Item
//Save Item
$(document).ready(function () {
    getAllItems(); // Corrected function name

    $("#btnSaveItem").click(function () {
        if (checkAllItem()) {
            saveItem();
        } else {
            alert("Error: Please check all fields");
        }
    });

    $("#btnItemClear").click(function () {
        clearItemInputFields();
    });
});

function getAllItems() {
    $("#ItmTBody").empty();

    $.ajax({
        url: "http://localhost:8080/app/item?function=getAll",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var rows = "";
            $.each(res.data, function (index, c) {
                let code = c.code;
                let name = c.description;
                let price = c.price;
                let qty = c.qty;
                let quality= c.quality;

                let row = "<tr><td>" + code + "</td><td>" + name + "</td><td>" + price + "</td><td>" + qty + "</td><td>" + quality + "</td></tr>";
                rows += row;
            });
            $("#ItmTBody").append(rows);
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

// Save Item
function saveItem() {
    let id = $("#ItemtxtID").val();
    let name = $("#ItemtxtName").val();
    let price = $("#ItemtxtPrice").val();
    let quantity = $("#ItemtxtQuantity").val();
    let quality = $("#ItemtxtQulity").val();


    let itemObj ={
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        quality:quality
    };

    $.ajax({
        url: "http://localhost:8080/app/item",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(itemObj),
        success: function (resp, textStatus, jqxhr) {
            alert("Item saved successfully");
            getAllItems();
            clearItemInputFields();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 409) {
                alert("Duplicate values. Please check again");
            } else {
                alert("Error: Item not added");
            }
        }
    });
}

//delete Item
$("#btnItemDelete").click(function () {
    let id = $("#ItemtxtID").val();
    let formData = $('#CustomerForm').serialize()
    let consent = confirm("Do you want to delete.?");
    if (consent) {
        $.ajax({
            url: "http://localhost:8080/app/item?id="+id,
            method: "delete",
            data:formData,
            success: function (res) {
                alert("customer remove");
                getAllItems()
                clearItemInputFields();
                console.log(res)
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message
                alert(message)
            },
        });
    }
});

//update  Item
$("#btnItemUpdate").click(function () {
    let id = $("#ItemtxtID").val();
    let name = $("#ItemtxtName").val();
    let price = $("#ItemtxtPrice").val();
    let quantity = $("#ItemtxtQuantity").val();
    let quality=$("#ItemtxtQulity").val();

    var ItemOB = {
        id:id,
        name:name,
        price:price,
        quantity:quantity,
        quality:quality
    }
    $.ajax({
        url: "http://localhost:8080/app/item",
        method:"put",
        contentType:"application/json",
        data:JSON.stringify(ItemOB),
        dataType:"json",
        success: function (res) {
            alert("customer updated");
            clearItemInputFields();
            getAllItems()

        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert("customer not update");
        },
    });
});

$(document).on('click', '#ItmTBody > tr', function() {
    let code = $(this).children().eq(0).text();
    let desc = $(this).children().eq(1).text();
    let salary = $(this).children().eq(2).text();
    let qty = $(this).children().eq(3).text();
    let quality = $(this).children().eq(4).text();

    $("#ItemtxtID").val(code);
    $("#ItemtxtName").val(desc);
    $("#ItemtxtPrice").val(salary);
    $("#ItemtxtQuantity").val(qty);
    $("#ItemtxtQulity").val(quality);

});