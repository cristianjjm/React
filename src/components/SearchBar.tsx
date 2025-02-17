import React, { useState, useEffect, useContext } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';
import '../css/SearchBar.css';

// Define the type for your hit objects
interface MyHit {
    posterPath: string;
    release_date: string;
    title: string;
    overview: string;
}

// Algolia client setup
const searchClient = algoliasearch(
    'DNCRQRG9TT',
    '5e57753c4850a44487eee72ceb91c04f'
);

// Component to render each hit
const HitComponent: React.FC<{ hit: MyHit }> = ({ hit }) => (
    <div className="hit-container">
        <img className="hit-image" src={hit.posterPath} alt="Imagen" />
        <div className="hit-info">
            <h2>{hit.title}</h2>
            <p>{hit.overview}</p>
            <h6>{hit.release_date}</h6>
        </div>
    </div>
);

// Pop-up component for displaying search results
const ResultsPopup = connectStateResults(({ searchState, searchResults }: any) => {
    const hasResults = searchResults && searchResults.nbHits !== 0;

    return (
        <div id="popup" style={{ display: hasResults ? 'block' : 'none' }} className="results-popup">
            {hasResults ? <Hits hitComponent={HitComponent} /> : <div>No results found.</div>}
        </div>
    );
});

const SearchBar: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleSearchStateChange = (state: any) => {
        setIsPopupVisible(!!state.query);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const popup = document.getElementById('popup');
        if (popup && !popup.contains(event.target as Node)) {
            setIsPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`search-container`}>
            <InstantSearch indexName="movie" searchClient={searchClient} onSearchStateChange={handleSearchStateChange}>
                <SearchBox className="search-input" />
                {isPopupVisible && <ResultsPopup />}
            </InstantSearch>
        </div>
    );
};

export default SearchBar;
