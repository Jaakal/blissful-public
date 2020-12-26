# Blissful

Blissful is a massage franchise e-commerce app, where users have to register and be logged in order to book massage sessions. I've implemented Stripe, PayPal and BTCPay Bitcoin payment options. The app is a PERN stack app (PostgreSQL, Express, React.js and Node.js) and for the state manager I used Redux. Animations are made with the GreenShock professional-grade JavaScript animation tool for the modern web. To see the massage booked animation (which can be seen from the screenshot), the easiest way is to use Stripe payment. You'll have to insert just a valid format person credentials, doesn't have to be a real person. For the credit card you'll have to use for credit card number "4242 4242 4242 4242", for expiration any date in the future and for CVC any three or four digit number.

<div class="button-group">
  <a href="https://jaak-kivinukk-blissful.herokuapp.com/massages" class="button" target="_blank" rel="noopener noreferrer">Live Version</a> |
  <a href="#screenshot" class="button">Screenshot</a> |
  <a href="#getting-started" class="button">Getting Started</a> |
  <a href="#built-with" class="button">Built With</a> |
  <a href="#assets" class="button">Assets</a> |
  <a href="#authors" class="button">Authors</a> |
  <a href="#license" class="button">License</a>
</div>

## Screenshot

![Screenshot of the webpage](/blissful.gif)

## Getting Started

Clone the repository into your local computer. You'll need to have the latest version of [Node](https://nodejs.org/en/download/) installed on your local machine.

For the stripe payment to work you'll need to create a [stripe account](https://stripe.com/en-ee) and get the secret and public key. Secret key has to be inserted in the `./config/default.json` and for the front-end you'll need to insert the public key to `./client/App.js`

For the PayPal payment you'll need to create a [paypal account](https://developer.paypal.com/docs/checkout/integrate/) and obtain a client id which has to be inserted in the PayPal script tag in the `./client/public/index.html`

For the BTCPay Bitcoin payment you'll need to create an account and an app on the [BTCPay](https://mainnet.demo.btcpayserver.org/Account/Login). Then you'll need to obtain the app id and insert it in the form action attribute in `./client/src/payment/BitcoinPayment.js`. Help for creating that can be found in the [introduction video](https://www.youtube.com/watch?v=xh3Eac66qc4) and [article](https://medium.com/@apotdevin/using-react-and-btcpayserver-to-receive-bitcoin-payments-2098b2856a3b). For seeding the BTCPay app first the database has to be set up, so from that after that.

For the animations to work you'll need to download the Club GreenSock module from their [webpage](https://greensock.com/docs/v3/Installation) and put it in the `./client` directory. It's not free but it's more than worth it!

For the database you'll need to have PostgreSQL installed in your local machine. Then you'll have to create the database, the query for that is in `./db/database.sql`. Credentials to connect the database have to be inserted in the `./config/default.json`.

When all that is done and I have not forgot something then it's time to run the command `npm install` in the project root directory from terminal. After that you can seed the database running the back-end with the `npm start` command in the root directory in terminal. Communicating with the server I use [Postman](https://www.postman.com/). From the Postman send GET request to `http://localhost:5000/api/seed`, which will seed the database. Then for the BTCPay app you can get the necessary script sending a GET request to `http://localhost:5000/api/seed/btcpay` from Postman and you'll have to enter it online in the app on their webpage. Those scripts are in the `./db/seed.js` file.

For JSON Web Token you'll need insert a random string for the jwtSecret value in the `./config/default.json` file.

If all that is working then for the whole application to work you can run in the root directory from terminal the command `npm run dev` and it should pop up in the default browser. Happy coding!

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
* [JavaScript](https://www.javascript.com/) - Programming language used
* [Node.js](https://nodejs.org/en/) - Programming language used
* [Express](https://expressjs.com/) - Node.js web application framework
* [PostgreSQL](https://www.postgresql.org/) - Relational Database used
* [HTML](https://en.wikipedia.org/wiki/HTML) - Hypertext Markup Language
* [SCSS](https://sass-lang.com/) - Sassy CSS
* [VS Code](https://code.visualstudio.com/) - The code editor used
* [Adobe Illustrator](https://www.adobe.com/fi/products/illustrator.html?sdid=8JD95K3P&mv=search&ef_id=Cj0KCQiAuJb_BRDJARIsAKkycUn8XSLsmCVgKjT9Uq7uikkPOT0uW54SJV26MyHJEwXUFzTVV1WnCa0aAuJbEALw_wcB:G:s&s_kwcid=AL!3085!3!340839992347!e!!g!!adobe%20illustrator!1480122690!60147184474&gclid=Cj0KCQiAuJb_BRDJARIsAKkycUn8XSLsmCVgKjT9Uq7uikkPOT0uW54SJV26MyHJEwXUFzTVV1WnCa0aAuJbEALw_wcB) - For creating vector graphics

## Assets

* [GreenSock](https://greensock.com/gsap/) - Professional-grade JavaScript animation tool for the modern web
* [Montserrat](https://fonts.google.com/specimen/Montserrat?query=Montser) - Font used
* [Poppins](https://fonts.google.com/specimen/Poppins?query=Poppins) - Font used

## Authors

👤 **Jaak Kivinukk**

<a href="https://github.com/Jaakal" target="_blank">

  ![Screenshot Image](/jaak-profile.png) 

</a>

- Github: [@Jaakal](https://github.com/Jaakal)
- Twitter: [@JKivinukk](https://twitter.com/JKivinukk)
- Linkedin: [Jaak Kivinukk](https://www.linkedin.com/in/jaak-kivinukk)
- Email: [jaak.kivinukk@gmail.com](jaak.kivinukk@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details