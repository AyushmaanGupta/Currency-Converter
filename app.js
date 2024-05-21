//we will use currency API
const BaseURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select"); //select al the selects insiede the dropdonw class div
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
  for (let currCode in countryList) {
    // console.log(currCode, countryList[currCode]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}



const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  //condition of invalid amt value-
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  //now for the actual conversion
  console.log(fromCurr.value, toCurr.value);

  // const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //we used the to lowercase beacuse the api can twork with the capital letters
  const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`; //we used the to lowercase beacuse the api can twork with the capital letters
  //this api will geenerate the response based on the request we send to it
  // console.log(amtval)

  let response = await fetch(URL);
  //nw oconvert the data into JS object (from JSON file)
  let data = await response.json();
  console.log(data);
  //now we need this data to be available on the screen
  // let rate = data[toCurr.value.toLowerCase];
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  //we need to multiply this with user entered amount to get hte final amount

  let finalAmount = amtval * rate;
  // msg.innerText = `1USD = 80INR`;
  msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  // console.log(rate);
};


const updateFlag = (element) => {
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  //how to acess the image
  //select element ke parent mein jake img tag ko access krna hoga
  let img = element.parentElement.querySelector("img");
  img.src = newSrc; //img mein new wala flag according to the country code daal diya
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate(); 


window.addEventListener("load", () => {
  updateExchangeRate();
});
  //by default button kuch kaam krta hai jaise refresh krna, toh hum chahte hai ki it should do the task that we want it do
  // let amount = document.querySelector(".amount input");
  // let amtval = amount.value;
  // //condition of invalid amt value-
  // if (amtval === "" || amtval < 1) {
  //   amtval = 1;
  //   amount.value = "1";
  // }
  // //now for the actual conversion
  // console.log(fromCurr.value, toCurr.value);

  // const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  //we used the to lowercase beacuse the api can twork with the capital letters 
  // //this api will geenerate the response based on the request we send to it
  // // console.log(amtval)

  // let response = await fetch(URL);
  // //nw oconvert the data into JS object (from JSON file)
  // let data = await response.json();
  // console.log(data);
  // //now we need this data to be available on the screen
  // let rate = data[toCurr.value.toLowerCase];
  // //we need to multiply this with user entered amount to get hte final amount

  // let finalAmount = amtval * rate;
  // // msg.innerText = `1USD = 80INR`;
  // msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  // // console.log(rate);
  
  //the API fetch is not working 
});


