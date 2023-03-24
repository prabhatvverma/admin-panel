$("#loginForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 4
        }
    },
    messages: {
        email: {
            required: "Enter Email",
            email: "Enter valid email"
        },
        password: {
            required: "Enter password",
            minlength: "At least 4 characters !"
        }
    }
})