Template.productForm.onRendered(function(){
    var brandField = $("input[name='brand']");
    var productManufacturerField = $("input[name='productManufacturer']");

    brandField.focusout(function(event){
        if (this.value !== '' || this.value !== this.defaultValue) {

            event.preventDefault();
            var theBrand = this.value;
            var theManufacturerDoc = Products.findOne({ brand: theBrand });
            if(!theManufacturerDoc){
                productManufacturerField.val("");
            } else {
                productManufacturerField.val(theManufacturerDoc.productManufacturer);
            }

        }
    });
});

Template.productForm.helpers({
    productSchema: function() {
        return Schemas.Products;
    }
});

