console.log("hello");
$("#changePass").validate({
    rules: {
        old_password: {
            required: true,
            minlength: 4
        },
        new_password: {
            required: true,
            minlength: 4
        },
        cnf_password: {
            required: true,
            minlength: 4,
            equalTo: '[name="new_password"]'
        }
    },
    messages: {
        old_password: {
            required: "Enter Password",
            minlength: "At least 4 characters!"
        },
        new_password: {
            required: "Enter Password",
            minlength: "At least 4 characters!"
        },
        cnf_password: {
            required: "Enter Password",
            minlength: "At least 4 characters!",
            equalTo: "Enter same password"
        }
    }
})