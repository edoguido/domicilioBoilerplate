import { useContext } from 'preact/hooks';

// Actions
import { Action } from "../index";

// Resources
import { whatsappIcon } from "../assets/icons/whatsappIcon";
export const ListItem = ({
	name,
	tel,
	whatsapp,
	mail,
	site,
	payments,
	services,
	newEntry,
	city,
	free_delivery,
	delivery_notes,
	opening_hours,
	note,
}) => {
	const action = useContext(Action);
	const encodedName = encodeURIComponent(name);
	const encodedCity = encodeURIComponent(process.env.PREACT_APP_CITY);
	const searchUrl = `https://www.google.com/search?q=${encodedName}%20${encodedCity}`;

	const isInfoVisible = Boolean(Array.isArray(tel) || site || mail || payments || services || note);

	return (
		<article class={`relative rounded-lg border border-gray-500 bg-gray-200 p-4 md:p-5 my-5 text-md lg:text-xl font-semibold text-gray-700 ${newEntry ? "new-entry" : ""}`}>
			<div class="flex justify-between items-center">
				<span>
					<a class="hover:underline" href={searchUrl} target="_blank" rel="noopener noreferrer">{name}</a>
				</span>
				<div class="flex">
					{isInfoVisible &&
						<span
							onClick={(e) => action.setPopupNumbers(e, props)}
							class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-blue-300 rounded-lg"
							role="img"
							aria-label="more info"
						>
							ℹ️
						</span>
					}
					{mail && !site && !tel && (
						<a href={`mailto:${mail}`}>
							<span
								class="inline-block mx-2 w-8 h-8 bg-orange-300 text-center leading-8 rounded-lg cursor-pointer"
								role="img"
								aria-label="mail"
							>
								✉️
							</span>
						</a>
					)}
					{site && !tel && (
						<a href={`${site}`}>
							<span
								class="inline-block mx-2 w-8 h-8 bg-orange-300 text-center leading-8 rounded-lg cursor-pointer"
								role="img"
								aria-label="website"
							>
								🌐
							</span>
						</a>
					)}
					{tel && (
						<a href={`tel:${tel}`} onClick={(e) => Array.isArray(tel) && action.setPopupNumbers(e, props)}>
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
							onClick={(e) => Array.isArray(tel) && action.setPopupNumbers(e, props)}
							class="inline-block mx-1 md:mx-2 w-8 h-8 cursor-pointer text-center leading-8 bg-yellow-300 rounded-lg"
							role="img"
							aria-label="warning"
						>
							⚠️
						</span>
					)}
				</div>
			</div>
		</article>
	);
};
