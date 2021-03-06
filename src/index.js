import { Component, createContext } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";

import "tailwindcss/dist/tailwind.min.css";
import "./assets/styles/global.css";

// Routes
import Home from "./routes/home.js";
import Form from "./routes/form.js";
import FormSuccess from "./routes/formSuccess";

// Components
import { Dialog } from "./components/dialog.js";
import { PWAPrompt } from "./components/pwaPrompt";

export const Action = createContext({});

const capitalizedCityName =
   process.env.PREACT_APP_CITY.charAt(0).toUpperCase() +
   process.env.PREACT_APP_CITY.slice(1);

export default class App extends Component {
   state = {
      results: {},
      isHomepage: true,
      isPopupOpen: false,
      popupNumbers: [],
   };

   handleRoute = (e) => {
      this.currentUrl = e.url;
      this.setState({ isHomepage: e.url.replace(/\?.*/g, "") === "/" });
   };

   setPopupNumbers = (e, numberArray) => {
      e.preventDefault();

      this.setState({
         popupNumbers: numberArray,
         isPopupOpen: true,
      });
   };

   closePopup = (e) => {
      if (e.currentTarget === e.target) {
         this.setState({ isPopupOpen: false });
      }
   };

   componentDidMount() {
      fetch(
         `${process.env.PREACT_APP_DATA_SOURCE}?c=${
            Math.random().toString(36).split(".")[1]
         }`
      )
         .then((r) => r.json())
         .then((json) => {
            this.setState({
               results: json,
               resultBkp: json,
            });
         });
   }

   //    const root = document.documentElement;
   //    root.style.setProperty(
   //       "--popup-visible",
   //       isPopupOpen ? "hidden" : "initial"
   //    );
   // }

   render(props, { isHomepage, results, popupNumbers, isPopupOpen }) {
      return (
         <Action.Provider value={{ setPopupNumbers: this.setPopupNumbers }}>
            <div id="app" class="px-5 max-w-screen-md mx-auto">
               <nav class="flex justify-center md:justify-end items-center">
                  {isHomepage ? (
                     <Link
                        class="m-5 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                        href="/form"
                     >
                        ➕ Aggiungi un'attività
                     </Link>
                  ) : (
                     <Link
                        class="m-6 text-blue-500 hover:text-blue-800"
                        href="/"
                     >
                        Ritorna alla ricerca
                     </Link>
                  )}
               </nav>
               <h1 class="font-sans text-4xl md:text-5xl lg:text-6xl pt-10 text-center">
                  <span
                     class="block sm:inline-block"
                     role="img"
                     aria-label="biker"
                  >
                     🚴
                  </span>
                  {` ${capitalizedCityName} a Domicilio`}
               </h1>
               <p class="max-w-lg mx-auto font-sans text-sm md:text-base lg:text-l pt-4 pb-6 text-center">
                  Il sito completamente gratuito che ti permette di avere sempre
                  a portata di mano i servizi con consegna a domicilio di{" "}
                  {capitalizedCityName} e dintorni!
               </p>
               <Router onChange={this.handleRoute}>
                  <Home path="/" results={results} />
                  <Form path="/form" />
                  <FormSuccess path="/form/success" />
               </Router>
            </div>
            <Dialog
               isOpen={isPopupOpen}
               closePopup={this.closePopup}
               telNumbers={popupNumbers}
            />
            <PWAPrompt />
         </Action.Provider>
      );
   }
}
