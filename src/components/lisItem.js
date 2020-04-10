import { useState, useContext } from "preact/hooks";

// Actions
import { Action } from "../index";

export const ListItem = ({ name, tel, site, mail, note, whatsapp }) => {
   const [infoVisible, setInfoVisible] = useState(false);
   const action = useContext(Action);
   const encodedName = encodeURIComponent(name);
   const encodedCity = encodeURIComponent(process.env.PREACT_APP_CITY);
   const searchUrl = `https://www.google.com/search?q=${encodedName}%20${encodedCity}`;

   function handleClick() {
      setInfoVisible(!infoVisible);
   }

   return (
      <div class="rounded-lg border bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl font-semibold text-gray-700">
         <div class="flex justify-between items-center">
            <span>
               <a
                  class="hover:underline"
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {name}
               </a>
            </span>
            <div class="flex">
               {note && (
                  <span
                     onClick={handleClick}
                     class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-yellow-300 rounded-lg"
                     role="img"
                     aria-label="warning"
                  >
                     ⚠️
                  </span>
               )}
               {site && (
                  <a href={`${site}`}>
                     <span
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-orange-300 rounded-lg"
                        role="img"
                        aria-label="website"
                     >
                        🌐
                     </span>
                  </a>
               )}
               {mail && (
                  <a href={`mailto:${mail}`}>
                     <span
                        class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-blue-300 rounded-lg"
                        role="img"
                        aria-label="e-mail"
                     >
                        ✉️
                     </span>
                  </a>
               )}
               {tel && (
                  <a
                     href={`tel:+39${tel}`}
                     //  onClick={(e) =>
                     //     Array.isArray(tel) && action.setPopupNumbers(e, tel)
                     //  }
                  >
                     <span
                        class="inline-block mx-2 w-8 h-8 bg-green-300 text-center leading-8 rounded-lg cursor-pointer"
                        role="img"
                        aria-label="telephone"
                     >
                        📞
                     </span>
                  </a>
               )}
               {whatsapp && (
                  <a href={`https://wa.me/39${whatsapp}`}>
                     <span
                        class="inline-block mx-2 w-8 h-8 bg-green-600 text-center leading-8 rounded-lg cursor-pointer"
                        role="img"
                        aria-label="whatsapp"
                     >
                        <img src="data:image/png;base64,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" />
                     </span>
                  </a>
               )}
            </div>
         </div>
         {infoVisible && (
            <div class="block mt-4">
               <p class="text-yellow-700 text-sm md:text-md lg:text-lg">
                  {note}
               </p>
            </div>
         )}
      </div>
   );
};
