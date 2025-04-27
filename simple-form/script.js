function calculateTotal() {
    const unit_price = {
        web: 500,
        logo: 300,
        seo: 400,
        maintenance: 150
    };

    let item_price = {};

    item_price.web = document.getElementById("qty_web").value * unit_price.web;
    document.getElementById("price_web").value = item_price.web;

    item_price.logo = document.getElementById("qty_logo").value * unit_price.logo;
    document.getElementById("price_logo").value = item_price.logo;

    item_price.seo = document.getElementById("qty_seo").value * unit_price.seo;
    document.getElementById("price_seo").value = item_price.seo;

    item_price.maintenance = document.getElementById("qty_maintenance").value * unit_price.maintenance;
    document.getElementById("price_maintenance").value = item_price.maintenance;

    let total = item_price.web + item_price.logo + item_price.seo + item_price.maintenance;
    document.getElementById("total_value").textContent = "$" + total;
}

document.addEventListener('DOMContentLoaded', function () {
    const quantityInputs = document.querySelectorAll(".qty");
    quantityInputs.forEach(function(input) {
        input.addEventListener("change", calculateTotal);
        input.addEventListener("keyup", calculateTotal);
    });
});
