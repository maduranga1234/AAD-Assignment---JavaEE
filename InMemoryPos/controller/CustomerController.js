$(document).ready(function () {
    getAllCustomers(); // Corrected function name

    $("#btnSaveCustomer").click(function () {
        if (checkAll()) {
            saveCustomer();
        } else {
            alert("Error");
        }
    });

    // Other event handlers...

    $('#btnCustomerClear').click(function () {
        clearCustomerInputFields();
    });
});

function getAllCustomers() {
    $("#tBdy").empty();

    $.ajax({
        url: "http://localhost:8080/app/customer?function=getAll",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var rows = "";
            $.each(res.data, function (index, c) {
                let cusId = c.id;
                let cusName = c.name;
                let cusAddress = c.address;
                let cusContact = c.contact;
                let cusEmail = c.email;
                let row = "<tr><td>" + cusId + "</td><td>" + cusName + "</td><td>" + cusAddress + "</td><td>" + cusContact + "</td><td>" + cusEmail + "</td></tr>";
                rows += row;
            });
            $("#tBdy").append(rows);
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

function saveCustomer() {
    let id = $("#CustomertxtID").val();
    let name = $("#CustomertxtName").val();
    let address = $("#CustomertxtAddress").val();
    let contact = $("#CustomertxtContact").val();
    let email = $("#CustomertxtEmail").val();

    let customObj ={
        id: id,
        name: name,
        address: address,
        contact:contact,
        email:email
    };

    $.ajax({
        url: "http://localhost:8080/app/customer",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(customObj),
        success: function (resp, textStatus, jqxhr) {
            alert("Customer saved successfully");
            getAllCustomers();
            clearCustomerInputFields();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 409){
                alert("Duplicate values. Please check again");
            } else {
                alert("Error: Customer not added");
            }
        }
    });
}

$('#btnCusDelete').click(function () {
    let formData = $('#CustomerForm').serialize()
    let id = $('#CustomertxtID').val();
    let consent = confirm("Do you want to delete.?");
    if (consent) {
        $.ajax({
            url: "http://localhost:8080/app/customer?id="+id,
            method: "delete",
            data:formData,
            success: function (res) {
                alert("customer remove");
                getAllCustomers()
                clearCustomerInputFields();
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message
                alert(message)
            },
        });
    }
})

$('#btnUpdate').click(function () {

    let id = $("#CustomertxtID").val();
    let name = $("#CustomertxtName").val();
    let address = $("#CustomertxtAddress").val();
    let contact = $("#CustomertxtContact").val();
    let email = $("#CustomertxtEmail").val();


    var CustomerOB = {
        id:id,
        name:name,
        address:address,
        contact:contact,
        email:email
    }
    $.ajax({
        url: "http://localhost:8080/app/customer",
        method:"put",
        contentType:"application/json",
        data:JSON.stringify(CustomerOB),
        dataType:"json",
        success: function (res) {
            getAllCustomers()
            alert("customer update");
            clearCustomerInputFields();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert("customer not update");
        },
    });
})



//click table .shire value textField help..............
$(document).on('click', '#tBdy > tr', function() {
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let address = $(this).children().eq(2).text();
    let contact = $(this).children().eq(3).text();
    let email = $(this).children().eq(4).text();

    $("#CustomertxtID").val(id);
    $("#CustomertxtName").val(name);
    $("#CustomertxtAddress").val(address);
    $("#CustomertxtContact").val(contact);
    $("#CustomertxtEmail").val(email);

});