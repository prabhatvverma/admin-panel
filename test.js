

// let date_ob = new Date();

// // current date
// // adjust 0 before single digit date
// let date = ("0" + date_ob.getDate()).slice(-2);

// // current month
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// // current year
// let year = date_ob.getFullYear();

// // current hours
// let hours = date_ob.getHours();

// // current minutes
// let minutes = date_ob.getMinutes();

// // current seconds
// let seconds = date_ob.getSeconds();

// // prints date in YYYY-MM-DD format
// // console.log(year + "-" + month + "-" + date);
// const realdate= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
// // prints date & time in YYYY-MM-DD HH:MM:SS format
// console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
// console.log(realdate);
// prints time in HH:MM format
// console.log(hours + ":" + minutes);


let ts = Date.now();


// timestamp in milliseconds
console.log(typeof(ts));
console.log(Math.floor(ts/1000));