$("#forgetPassForm").validate({
    rules: {
        email: {
            required: true,
            email: true
        }
    },
        
        messages: {
            email: {
                required: "Enter email",
                email: "Enter valid email"
            },
        }
    });
