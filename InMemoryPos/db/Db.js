var customerDB = [
    {id: "C00-001", name: "Sachin Thamalsha", address: "Mathara", contact: "0912345678" , email:"madu@gmail.com"},
    {id: "C00-002", name: "Ranjith Perera", address: "Panadura", contact: "0789023123" ,email:"madu@gmail12.com"},
    {id: "C00-003", name: "Kavindu Perera", address: "Panadura", contact: "0777227815",email:"madu@gmail43.com"}
];

var itemDB = [
    {code:"I00-001",name:"Lux",unitPrice: 100.00,qtyOnHand: 100,qlity: "Good"},
    {code:"I00-002",name:"Sunlight",unitPrice: 345.00,qtyOnHand: 150,qlity: "Good"},
    {code:"I00-003",name:"Light Boy",unitPrice: 245.00,qtyOnHand: 400,qlity: "Good"}
];

var orderDB = [
    {oid:"OID-001", date:"2023/10/06", customerID:"C00-001",
        orderDetails:[
            {oid:"OID-001", code:"I00-001", qty:10, unitPrice:145.00},
            {oid:"OID-001", code:"I00-002", qty:2, unitPrice:345.00}
        ]
    }
];