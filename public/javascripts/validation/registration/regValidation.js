$("#formRegister").validate({
    rules: {
        first_name: {
            required: true,
            minlength: 3
        },
        last_name: {
            required: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
        password: {
            // required: true,
            minlength: 4
        },
        cpassword: {
            // required: true,
            minlength: 4,
            equalTo: '[name="password"]'
        }
    },
    messages: {
        first_name: {
            required: "Enter first name",
            minlength: "At least 3 characters !"
        },
        last_name:{
            required: "Enter last name",
            minlength: "At least 3 characters !"
        },
        email: {
            required: "Enter Email",
            email: "Enter A valid Email"
        },
        password: {
            required: "Enter Password",
            minlength: "At least 4 characters !"

        },
        cpassword: {
            required: "Enter Password",
            minlength: "At least 4 characters !",
            equalTo: "Enter same password"
        }
    }
});

// const email = document.getElementsById('email');
// email.addEventListener('load',validateEmail);

// function validateEmail(){
//     console.log("load event workin");
//     const url = "/register"
//     const method = "POST"
    
//     const xhr = XMLHttpRequest();

//     xhr.addEventListener('load', (e)=>
//     {

//     })
// }


