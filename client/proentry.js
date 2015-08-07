function clearAllFields(name) {
    $(name + " input").each(function () {
        $(this).val("");
    });
}

Meteor.startup(function () {
    //Meteor.subscribe("productTitles");
    Meteor.call("generateAdmin");
});

//AutoForm.debug();