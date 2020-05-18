import { Component, Fragment } from "preact";

import { ListCategory } from "../components/listCategory";

export default class Home extends Component {
	state = {
		filter: '',
		categoryFilter: null
	};
	
   calculateStoresNumber() {
      const { results: stores } = this.props;
      const keys = Object.keys(stores);
      let storesNumber = 0;
      for (const key of keys) {
         storesNumber += stores[key].data.length;
      }
      return storesNumber;
   }

   getFinalSentence(categoriesToList) {
      const { results: stores } = this.props;
      const keys = Object.keys(stores);
      const relevantKeys = keys.slice(0, categoriesToList)
      if (relevantKeys.length === 0) return ""; 
      const joinedRelevantKeys = relevantKeys.join(", ");
      return `tra ${joinedRelevantKeys} ed altri`;
   }

   handleChangeFilter = e => {
		const text = e.target.value;
		this.setState({ filter: text });
   };

	handleCategoryFilter = key => _ => { // eslint-disable-line no-unused-vars
		if (key === this.state.categoryFilter) {
			return this.setState({ categoryFilter: null });
		}
		this.setState({ categoryFilter: key });
	};

	filteredCategories(filter, categoryFilter) {
		const { results } = this.props;
		const regexStore = new RegExp(`${filter}`, 'i');
		const regexCategory = new RegExp(`[${filter}]{${filter.length},}`, 'i');

		return Object.keys(results)
			.filter(key => (categoryFilter ? categoryFilter === key : true))
			.reduce((acc, key) => {
				return (
					{
						...acc,
						[key]: {
							icon: results[key].icon,
							data: regexCategory.test(key)
                     ? results[key].data
                     : results[key].data.filter(e =>
                          filter.length ? regexStore.test(e.name) : true
                       )
						}
					}
				);
			}, {});
	}
	
	isEmptySearch(filteredStores) {
		let storesFound = 0;
		for (let key in filteredStores) {
			storesFound += filteredStores[key].data.length;
		}
		return storesFound === 0;
	}

	render(props, { filter, categoryFilter }) {
		const { results: stores } = props;
    const filteredStores = this.filteredCategories(filter, categoryFilter);
    const storesNumber = this.calculateStoresNumber();
    const finalSentence = this.getFinalSentence(9);
		const isEmptySearch = this.isEmptySearch(filteredStores);
    
		return (
			<Fragment>
            {storesNumber > 0 && (
               <div class="text-center mt-2 mb-5">
                  {storesNumber} attività {finalSentence} che consegnano a domicilio a <span class="capitalize">{process.env.PREACT_APP_CITY}</span>.
               </div>
            )}
				<div class="relative p-5 lg:max-w-5xl xl:max-w-6xl lg:m-auto pb-10">
					<input
						class="bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
						type="text"
						placeholder="Cerca Attività"
						onInput={this.handleChangeFilter}
					/>
				</div>
				<div class="relative flex overflow-x-scroll text-center mt-2 pb-5">
					{Object.keys(stores).map(key => (
						<button
							onClick={this.handleCategoryFilter(key)}
							class={`m-1 flex-grow-0 flex-shrink-0 items-center border border-blue-500 py-2 px-4 rounded-full ${
								key === categoryFilter
									? "bg-blue-500 hover:bg-blue-500 text-white outline-none text-white"
									: "bg-white hover:bg-blue-500 hover:text-white"
							}`}
						>
							<span>{`${stores[key].icon} ${key}`}</span>
						</button>
					))}
				</div>
				<div class="relative mb-10 font-sans text-md text-gray-800">
					{
						Object.keys(filteredStores)
							.filter(key => filteredStores[key].data.length)
							.map(key => (
								<ListCategory
									name={key}
									category={filteredStores[key]}
									filter={filter}
								/>
							))
					}
				</div>
				{isEmptySearch && (
					<p class="font-bold mt-5 mb-10 text-center">Oops! 😅 Non ci sono attività corrispondenti alla tua ricerca.</p>
				)}
            <div class="text-center w-full">
               <p class="mb-1">
                  Developed with ❤️ by{" "}
                  <a
                     class="text-orange-500"
                     href={process.env.PREACT_APP_DEV_LINK}
                     target="_blank"
                  >
                     {process.env.PREACT_APP_DEV_NAME}
                  </a>
               </p>
               <p class="mb-5">
                  Raccolta dati a cura dei{" "}
                  <a
                     class="text-orange-500"
                     href="https://www.instagram.com/giovanidemocraticimonza/"
                     target="_blank"
                     rel="external nofollow noopener noreferrer"
                  >
                     Giovani Democratici di Monza
                  </a>
               </p>
               <p class="mb-5">
                  Progetto originale di{" "}
                  <a
                     class="text-orange-500"
                     href={process.env.PREACT_APP_CREATOR_LINK}
                     target="_blank"
                     rel="external nofollow noopener noreferrer"
                  >
                     {process.env.PREACT_APP_CREATOR_NAME}
                  </a>
               </p>
               <a
                  href={process.env.PREACT_APP_ORIGINAL_REPO}
                  target="_blank"
                  rel="external nofollow noopener noreferrer"
                  class="mb-5 text-xs block hover:underline"
               >
                  Vuoi crearlo per la tua città? Clicca qui per visitare la
                  pagina GitHub del progetto!
               </a>
            </div>
         </Fragment>
      );
   }
}
