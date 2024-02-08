// customer side

let selectElement = document.getElementById("inputState");
getAllCustomer();
function getAllCustomer() {
    customerDB.forEach(function(customer) {
        let option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        selectElement.appendChild(option);
    });
}

let CustomerIdShirOrder;
selectElement.addEventListener("change", function () {
    let selectedId = selectElement.value;
    let selectedCustomer = customerDB.find(function(customer) {
        return customer.id === selectedId;
    });
    if (selectedCustomer) {
        $("#Custid").val(selectedCustomer.id);
        $("#Custname").val(selectedCustomer.name);

        CustomerIdShirOrder = selectedCustomer.id;
    }
});

// item side
getAllCustomercheck();
function getAllCustomercheck() {
    customerDB.forEach(function (customer) {
        console.log(customer.id);
        console.log(customer.name);

    });
}

let selectItemElement = document.getElementById("inputState1");
let itemCode;
let itemName;

itemDB.forEach(function(item) {
    let option = document.createElement("option");
    option.value = item.code;
    option.textContent = item.code;
    selectItemElement.appendChild(option);
});

let itemCodetoOrder;
let itemNametoOrder;
let itemPricetoOrder;
let itemQTYLow;
let ChoiceElementOrder = document.getElementById("OrderItemqty");
const defaultArrayToSecondItem = [];
selectItemElement.addEventListener("change", function () {
    let selectedId = selectItemElement.value;
    let selectedItem = itemDB.find(function(item) {
        return item.code === selectedId;
    });
    if (selectedItem) {
        CheckQTY(selectedItem.qtyOnHand);
        $("#inputState1").val(selectedItem.code);
        $("#OrderitemName").val(selectedItem.name);
        $("#OrderUnitprice").val(selectedItem.unitPrice);
        $("#qtyH").val(selectedItem.qtyOnHand);
        $("#qlity").val(selectedItem.qlity);

        itemCodetoOrder = selectedItem.code;
        itemNametoOrder = selectedItem.name;
        itemPricetoOrder = selectedItem.unitPrice;
        itemQTYLow = selectedItem.qtyOnHand;
    }
});

let NotablesetRound=0;
function getAllItemTOOrder() {
    alert("gfg")
    let newItemtoOrder = Object.assign({}, itemToOrder);
    let totalItemPrice = itemPricetoOrder * ChoiceElementOrder.value;
    let existingItemIndex = defaultArrayToSecondItem.findIndex(item => item.itemCode === itemCodetoOrder);
    if (existingItemIndex !== -1) {
        defaultArrayToSecondItem[existingItemIndex].itemQTYChoice = ChoiceElementOrder.value;
        defaultArrayToSecondItem[existingItemIndex].totalPrice = totalItemPrice;

    } else {
        newItemtoOrder.itemCode = itemCodetoOrder;
        newItemtoOrder.itemName = itemNametoOrder;
        newItemtoOrder.itemPrice = itemPricetoOrder;
        newItemtoOrder.itemQTYChoice = ChoiceElementOrder.value;
        newItemtoOrder.totalPrice = totalItemPrice;
        defaultArrayToSecondItem.push(newItemtoOrder);
        NotablesetRound++;
        // alert(NotablesetRound);
    }
    getAllItemSetTableArray();
}

function getAllItemSetTableArray() {
    $("#orderTbdy").empty()
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let id = defaultArrayToSecondItem[i].itemCode;
        let name = defaultArrayToSecondItem[i].itemName;
        let price = defaultArrayToSecondItem[i].itemPrice;
        let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
        let total = defaultArrayToSecondItem[i].totalPrice;
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${QTY}</td>
                     <td>${total}</td>
                    </tr>`;
        $("#orderTbdy").append(row);
        calculateTotalPrice();
    }
}

//purchase order
let totalPriceSum2;
function calculateTotalPrice() {
    alert("total")
    let totalPriceSum = 0;
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        totalPriceSum += defaultArrayToSecondItem[i].totalPrice;
    }
    document.getElementById("lableTotPrice").innerHTML = totalPriceSum;
    document.getElementById("lableSubTotal").innerHTML = totalPriceSum;
    totalPriceSum2=totalPriceSum;


}

let inputCash = document.getElementById("cash");
let cashLOwMasse = document.getElementById("cashShow");

inputCash.addEventListener("keyup", function () {
    inputCashCheck();
});

// discount
let discount = document.getElementById("Discount");
discount.addEventListener("keyup", function (){
    let discountValue = discount.value;
    let discountAmount = (discountValue / 100) * totalPriceSum2;
    let discountedPrice = totalPriceSum2 - discountAmount;
    document.getElementById("lableSubTotal").innerHTML = discountedPrice;
    let balance = inputCash.value-discountedPrice;
    $("#Balance").val(balance);
});

function ItemQTYLower(orderIDstor) {
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let defaultArrayItemCode = defaultArrayToSecondItem[i].itemCode;
        let defaultArrayItemQTY = defaultArrayToSecondItem[i].itemQTYChoice;

        for (let k = 0; k < itemDB.length; k++) {
            let ItemCode = itemDB[k].code;
            if (defaultArrayItemCode === ItemCode) {
                let itemQtyOnHand = itemDB[k].qtyOnHand;
                let lowQTYUpdate = itemQtyOnHand - defaultArrayItemQTY;

                itemDB[k].qtyOnHand = lowQTYUpdate;

                // console.log("Code: " + itemDB[k].code);
                // console.log("Description: " + itemDB[k].description);
                // console.log("Qty on Hand: " + lowQTYUpdate);
                // console.log("Unit Price: " + itemDB[k].unitPrice);
                // console.log("\n");
            }
        }
    }
    setOrderValue(orderIDstor);
}

// arry set value

function setOrderValue(orderIDstor) {
    // orderDB.length=0;
    // orderDB.orderDetails=0
    let orderId = orderIDstor;
    let date = $("#date").val();
    let custId = $("#inputState").val();

    let order = {
        oid: orderId,
        date: date,
        customerID: custId,
        orderDetails: []
    };

    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let id = defaultArrayToSecondItem[i].itemCode;
        let name = defaultArrayToSecondItem[i].itemName;
        let price = defaultArrayToSecondItem[i].itemPrice;
        let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
        let total = defaultArrayToSecondItem[i].totalPrice;

        order.orderDetails.push({
                oid: orderId,
                code: id,
                qty: QTY,
                unitPrice: total
            }
        );
    }

    orderDB.push(order);

    defaultArrayToSecondItem.length=0;


    // orderDB.forEach(function (order) {
    //     console.log("Order ID: " + order.oid);
    //     console.log("Date: " + order.date);
    //     console.log("Customer ID: " + order.customerID);
    //
    //     order.orderDetails.forEach(function (detail) {
    //         console.log("Order Detail Code: " + detail.oid);
    //         console.log("Order Detail Code: " + detail.code);
    //         console.log("Quantity: " + detail.qty);
    //         console.log("Unit Price: " + detail.unitPrice);
    //     });
    // });

    // for (let i = 0; i < secondRoundArry.length; i++) {
    //     console.log(secondRoundArry[i]);
    // }

    allemtyset();
}

const totalArry = [];
let ChoiceElement6 = document.getElementById("oId");
ChoiceElement6.addEventListener("keyup", function () {
    let inputOrd = ChoiceElement6.value;
    $("#orderTbdy").empty();

    for (let i = 0; i < orderDB.length; i++) {
        let order = orderDB[i];
        if (order.oid === inputOrd) {
            let orderDetails = order.orderDetails;
            let totalOrderPrice = 0;

            for (let j = 0; j < orderDetails.length; j++) {
                let code = orderDetails[j].code;
                let QTY = orderDetails[j].qty;
                let unitPrice = orderDetails[j].unitPrice;

                for (let k = 0; k < itemDB.length; k++) {
                    let realItemid = itemDB[k].code;

                    if (realItemid === code) {
                        let realItemname = itemDB[k].name;
                        let realItemPrice = itemDB[k].unitPrice;
                        let row = `<tr>
                            <td>${code}</td>
                            <td>${realItemname}</td>
                            <td>${realItemPrice}</td>
                            <td>${QTY}</td>
                            <td>${unitPrice}</td>
                        </tr>`;
                        $("#orderTbdy").append(row);

                        totalOrderPrice += unitPrice;
                    }
                }
            }
            $("#lableTotPrice").text(totalOrderPrice);
            $("#lableSubTotal").text(totalOrderPrice);
        }
    }
});

$(document).ready(function () {
    $('#clickTable').on('click', 'tr', function () {
        var userConfirmed = confirm("Do you want to Remove ?");

        if (userConfirmed) {
            alert("Success");
            let Itemcode = $(this).children().eq(0).text();

            for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
                if (defaultArrayToSecondItem[i].itemCode == Itemcode) {
                    defaultArrayToSecondItem.splice(i, 1);
                    $("#lableTotPrice").text("0");
                    $("#lableSubTotal").text("0");
                    getAllItemSetTableArray();
                }
            }
        } else {

        }

    });
});
