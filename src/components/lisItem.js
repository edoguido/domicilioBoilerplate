import { useState, useContext } from "preact/hooks";

// Actions
import { Action } from "../index";

// Resources
import { whatsappIcon } from "../assets/icons/whatsappIcon";

export const ListItem = ({
   name,
   tel,
   whatsapp,
   site,
   mail,
   city,
   free_delivery,
   delivery_notes,
   opening_hours,
   note,
}) => {
   const [infoVisible, setInfoVisible] = useState(false);
   const action = useContext(Action);
   const encodedName = encodeURIComponent(name);
   const encodedCity = encodeURIComponent(process.env.PREACT_APP_CITY);
   const searchUrl = `https://www.google.com/search?q=${encodedName}%20${encodedCity}`;
   const telNumbers =
      tel !== "" && tel !== null && tel !== undefined ? tel.split(",") : false;

   function handleClick() {
      setInfoVisible(!infoVisible);
   }

   return (
      <div class="rounded-lg border bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl text-gray-700">
         <div class="flex justify-between items-center">
            <div class="flex flex-col">
               <div class="text-sm capitalize">
                  <span>📍 </span>
                  <a
                     class="hover:underline"
                     href={searchUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     {city}
                  </a>
               </div>
               <a
                  class="hover:underline font-semibold mt-1"
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {name}
               </a>
               {free_delivery === "true" && (
                  <p class="text-green-600 text-sm md:text-md">
                     Consegna gratuita
                  </p>
               )}
               {free_delivery === "if" && (
                  <p class="text-yellow-700 text-sm md:text-md">
                     {delivery_notes}
                  </p>
               )}
            </div>
            <div class="flex">
               {delivery_notes && (
                  <span
                     onClick={handleClick}
                     class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-yellow-300 rounded-lg"
                     role="img"
                     aria-label="warning"
                  >
                     🗒
                  </span>
               )}
               {site && (
                  <a href={`${site}`} target="_blank" rel="noopener noreferrer">
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
                     href={`tel:+39${telNumbers}`}
                     onClick={(e) =>
                        Array.isArray(telNumbers) &&
                        telNumbers.length > 1 &&
                        action.setPopupNumbers(e, telNumbers)
                     }
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
                        class="inline-block mx-2 w-8 h-8 bg-green-500 text-center leading-8 rounded-lg cursor-pointer"
                        role="img"
                        aria-label="whatsapp"
                     >
                        <img src={whatsappIcon} />
                     </span>
                  </a>
               )}
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
            </div>
         </div>
         {infoVisible && (
            <div class="block mt-4">
               <p class="text-sm mb-2 md:text-md lg:text-lg">{opening_hours}</p>
               <p class="text-sm md:text-md lg:text-lg">{note}</p>
            </div>
         )}
      </div>
   );
};
