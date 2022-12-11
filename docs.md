The task is to create the price calculation webpage of a fictitious company SufniGSM for used mobile phones. The price calculation will be done by an external API, which is able to provide a recommended price by the properties of the phone.
The API endpoint address is:

https://softcamp.hu/webler/arkalkulator.php

The price calculator expects the following GET parameters:

- brand : free text field, manufacturer of the phone

- model : free text field, exact type of phone

- os : free text field, operating system. Possible values: ios only
  or android

- releaseYear : number, date of release of the phone (must be less than 10 years old)

- startScore :number, from 1 to 10, how good the phone was in your company's opinion at the time of release.(properties of the phone to provide a recommended price.)

- startPrice : number, the opening price at launch (USD, in US dollars units of measure are not allowed, only number!)

- condition: number - the current condition of the phone from 0 to 100, where 100 is almost unpacked (so it is in perfect condition) 0 means the phone is broken into pieces.

---

Some examples of the API:
iPhone 8 (2017), at release was a 10/10 phone with a starting price of $699, currently is is a 80% phone.

https://softcamp.hu/webler/arkalkulator.php?brand=iPhone&model=8&os=ios&releaseYear=2
017&startScore=10&startPrice=699&condition=80

Samsung Galaxy S20 (2020), was a 10/10 phone at launch with a starting price of $999, currently it is a 95% phone.
https://softcamp.hu/webler/arkalkulator.php?brand=Samsung&model=Galaxy%20S20&os=a
ndroid&releaseYear=2020&startScore=10&startPrice=999&condition=95

Huawei P40 (2020), was a 7/10 phone at launch, starting price $899, currently it is a 88% phone.

https://softcamp.hu/webler/arkalkulator.php?brand=Huawei&model=P40&os=android&releas
eYear=2020&startScore=7&startPrice=899&condition=88

---

In response we get back a JSON format data with 2 properties: error, data. If there is an error, it contains the error message, otherwise null. If there is no error, the data property is filled with the phone's data, like brand, os, model, releaseYear, but the important thing is
recommendedPrice and details.

The recommendedPrice is the recommended retail price considering its condition, and in the details the depreciation over the years has to be shown, with 100% condition.

We will work with this API.

The other API is the https://api.coinstats.app/public/v1/fiats api endpoint.

////////////////////////////////////////////////////////////////////////////////////////////

Task 1 (10 points)
Create a react application from which you delete all files that are not absolutely necessary for correct operation. Install the packages that are needed to make API calls, display icons, define animations within react and the one that allows you to navigate the page.

Create 2 routing rules:

- /products
- /calculation
  Create a simple menu or page layout that you like, where you refer to these menu items.

○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺

Task 2 (10 points)
Use the phones_schema.json file attached to this exercise. Create a /products menu item where you display the contents of the phones_schema.json file and then make them clickable.
Create a context in which you store the details of the selected device that you have choosen the /products menu item before. (selected by clicking on it).
The selected device has to be displayed in highlighted in the interface to show which device is active.

○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺

Task 3 (10 points)
Create the /calculation menu item, its content should be a nicely formatted form. In the form, enter the details of the device selected in /products if if there is one, if not, simply display a blank fillable form so that the administrator to fill it in himself. The elements of the form should be the same as in the description above. Make sure that the condition parameter is not included in the phones_schema.json file, so it must always be specified manually or in advance which the administrator can modify if they wish. After filling out the form, call the API endpoint shown above, and display the data (that you have got in the response) in the interface in any way you like. Make sure that there is an error display with error message in case of an error!

○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺
Task 4 (10 points)
Unfortunately, the service provider only charges us in dollars, but with the help of the API that we have used before in our classes we can easily convert dollars into other currencies.
The API we used before:

https://api.coinstats.app/public/v1/fiats

○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺○☺

Task 5 (10 points)
Create a modern, pleasant-looking design for the app, nothing can limit your creativity, not even me, so it's entirely up to you.
At this point I will evaluate creativity, where there is no formatting it is 0 points, nicely designed,
aesthetically pleasing solution is 10 points.
This is what he wants in a few days. Honestly if 3 tasks are done, I am happy, I don't have enough knowledge to all of this :/
