$(document).ready(function () {
    $("form#pizzaMenu").submit(function (event) {
      var size, crust, toppings, count;
      size = $("#pizzaSize :selected");
      crust = $("#pizzaCrust :selected");
      toppings = $("#pizzaToppings :selected");
  
      count = parseInt($("#pizzaNumber").val());
  
      var pizzaOrder = new PizzaOrder(size, crust, toppings, count);
      addToCart(pizzaOrder);
  
      event.preventDefault();
    });
  




    $("#checkoutBtn").click(function () {
      var delivery = $("#delivery :checked").val();
      var location = $("#deliveryLocation").val()
      var allCharge = parseInt($("#tottal-charge").html());
  
      if (delivery === "deliver") {
        alert(`Enjoy your meal.
        Your total charge is Ksh ${allCharge + 150}/=
        Your delivery is en-route to ${location}`);
        } else {
          alert(`Enjoy your meal
          Your total charge is Ksh ${allCharge}`);
      }
    });
  


  
});


//add pizza to cart
function PizzaOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaCount) {
  this.size = pizzaSize;
  this.crust = pizzaCrust;
  this.toppings = pizzaToppings;
  this.count = pizzaCount;
}

PizzaOrder.prototype.getPrice = function () {
  var sizePrice, crustPrice, toppingsPrice;
  sizePrice = parseInt(this.size.val());
  crustPrice = parseInt(this.crust.val());

  toppingsPrice = this.toppings.map(function () {
    return parseInt($(this).val());
  });
  var toppingsTotalPrice = 0;
  for (var i = 0; i < toppingsPrice.length; i++) {
    toppingsTotalPrice += toppingsPrice[i];
  }

  var orderPrice = (sizePrice + crustPrice + toppingsTotalPrice) * this.count;
  return orderPrice;
};



function addToCart(order) {
  var toppings = order.toppings
    .map(function () {
      return this.id;
    })
    .get()
    .join();
  $("#pizzaCart tbody").append(`<tr>
                                  <td>${order.size.html()}</td>
                                  <td>${order.crust.html()}</td>
                                  <td>${toppings}</td>
                                  <td>${order.getPrice()}</td>
                                </tr>`);

  var currentTotalCharge = parseInt($("#tottal-charge").html());
  $("#tottal-charge").html(currentTotalCharge + order.getPrice());
  $("#checkoutBtn").show();
  $("#delivery").show();
}