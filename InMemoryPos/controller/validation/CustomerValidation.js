const Cust_ID_Check = /^(C00-)[0-9]{3}$/;
const Cust_Name_Check = /^[A-Za-z ]{4,}$/;
const Cust_Address_Check = /^[A-Za-z0-9 ]{5,}$/;
const ContactNumberRegex = /^[0-9]{10}$/;
const EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;


let custArray = new Array();
custArray.push({field: $("#CustomertxtID"), regEx: Cust_ID_Check});
custArray.push({field: $("#CustomertxtName"), regEx: Cust_Name_Check});
custArray.push({field: $("#CustomertxtAddress"), regEx: Cust_Address_Check});
custArray.push({field: $("#CustomertxtContact"), regEx: ContactNumberRegex});
custArray.push({field: $("#CustomertxtEmail"), regEx: EmailRegex});


function clearCustomerInputFields() {
    $("#CustomertxtID,#CustomertxtName,#CustomertxtAddress,#CustomertxtContact,#CustomertxtEmail").val("");
    $("#CustomertxtID,#CustomertxtName,#CustomertxtAddress,#CustomertxtContact,#CustomertxtEmail").css("border", "1px solid #ced4da");
    $("#CustomertxtID").focus();
    setBtn();
}

setBtn();

function setBtn() {
    $("#btnCusDelete").prop("disabled", true);
    $("#btnUpdate").prop("disabled", true);

    if (checkAll()) {
        $("#btnSaveCustomer").prop("disabled", false);
        $("#btnCusDelete").prop("disabled", false);
        $("#btnUpdate").prop("disabled", false);
    } else {
        $("#btnSaveCustomer").prop("disabled", true);
        $("#btnCusDelete").prop("disabled", true);
        $("#btnUpdate").prop("disabled", true);
    }
}

$("#CustomertxtID,#CustomertxtName,#CustomertxtAddress,#CustomertxtContact,#CustomertxtEmail").on("keydown keyup", function (e) {
    let indexNo = custArray.indexOf(custArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(custArray[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != custArray[custArray.length - 1].field.attr("id")) {
            if (checkValidations(custArray[indexNo])) {
                custArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(custArray[indexNo])) {
                saveCustomer();
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

function checkAll() {
    for (let i = 0; i < custArray.length; i++) {
        if (!checkValidations(custArray[i])) return false;
    }
    return true;
}