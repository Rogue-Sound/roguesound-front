import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import { setQueue } from '@context/playing';
import Input from '@common/Input';
import { addSong } from '@services/api';
import { search, topTracks } from '@services/spotify';
import { SongSearchConstants } from '@utils/constants';
import { translate } from '@utils';

import SongResult from './SongResult';

import './SearchSongs.scss';

const SearchSongs = () => {
  const intl = useIntl();
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [song, setSong] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // TODO: Change with custom names
  const user = useSelector(state => state.me.displayName);
  const dispatch = useDispatch();

  const searchSongs = async (query, newOffset = offset) => {
    const result = await search(query, newOffset);
    setExpanded(true);
    setSearchResults(result);
    setSearchTimeout(null);
  };

  const favouriteSongs = async (newOffset = offset) => {
    const result = await topTracks(newOffset);
    setExpanded(true);
    setSearchResults(result);
    setSearchTimeout(null);
  };

  const clearSearch = () => {
    setSong('');
    setSearchResults([]);
    clearTimeout(searchTimeout);
    setSearchTimeout(null);
    setExpanded(false);
    setOffset(0);
  };

  const handleChangeSong = event => {
    const songValue = event.currentTarget.value;
    setOffset(0);
    setSong(songValue);
    if (!songValue.length) {
      clearSearch();
    }
  };

  const handleSongSelect = async selectedSong => {
    try {
      selectedSong = {
        ...selectedSong,
        user,
      };
      const result = await addSong(selectedSong);
      console.log('Song added to the list');
      dispatch(setQueue(result.songs));
      // !remaining && setTimeout(() => handleJoin(), 1000);
    } catch {
      console.log('There was a problem adding the song to the list');
    }
    clearSearch();
  };

  const handleOffset = newOffset => {
    setOffset(newOffset);
    song ? searchSongs(song, newOffset) : favouriteSongs(newOffset);
  };

  useEffect(() => {
    if (song && song.length) {
      searchTimeout && clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          searchSongs(song);
        }, 750)
      );
    }
  }, [song]);

  const renderSearch = () => {
    if (searchTimeout) {
      return (
        <p className="song-search__searching">
          {translate(intl, 'app.pages.Home.SearchSongs.Searching')}
        </p>
      );
    }
    if (searchResults && searchResults.length) {
      return searchResults.map(songResult => (
        <SongResult
          song={songResult}
          key={songResult.id}
          onClickCallback={handleSongSelect}
        />
      ));
    }
    if (song)
      return (
        <p className="song-search__no-results">
          {translate(
            intl,
            'app.pages.Home.SearchSongs.SearchForSongsNoResultsText'
          )}
        </p>
      );
    return null;
  };

  return (
    <>
      <div className="song-search">
        <FontAwesomeIcon icon="search" />
        <Input
          value={song}
          // name="song-search"
          placeholder={intl.formatMessage({
            id: 'app.pages.Home.SearchSongs.SearchForSongs',
          })}
          onChange={handleChangeSong}
          padding="0.375rem 0"
        />
        {expanded ? (
          <FontAwesomeIcon
            icon="times"
            className="clear-search-results"
            onClick={() => clearSearch()}
          />
        ) : (
          <FontAwesomeIcon
            icon="heart"
            className="get-favourite-songs"
            onClick={() => favouriteSongs()}
          />
        )}
      </div>
      <div className={`song-search-results ${!expanded && 'hidden'}`}>
        {!!offset && (
          <FontAwesomeIcon
            icon="angle-left"
            onClick={() =>
              handleOffset(offset - SongSearchConstants.SEARCH_LIMIT)
            }
            className="pagination prev"
          />
        )}
        {renderSearch()}
        {!searchTimeout &&
          searchResults.length === SongSearchConstants.SEARCH_LIMIT && (
            <FontAwesomeIcon
              icon="angle-right"
              onClick={() =>
                handleOffset(offset + SongSearchConstants.SEARCH_LIMIT)
              }
              className="pagination next"
            />
          )}
      </div>
    </>
  );
};

SearchSongs.propTypes = {};

export default SearchSongs;
