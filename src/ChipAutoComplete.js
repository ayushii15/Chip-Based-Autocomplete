import React, { useState, useEffect, useRef } from 'react';
import './ChipAutoComplete.css';

const ChipAutoComplete = ({ initialTags = [], suggestions = [] }) => {
  const [tags, setTags] = useState(initialTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        if (highlightedIndex < filteredSuggestions.length - 1) {
          const list = document.querySelector('.suggestions-list');
          list.children[highlightedIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : -1
        );
        if (highlightedIndex > 0) {
          const list = document.querySelector('.suggestions-list');
          list.children[highlightedIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        } 
      } else if (event.key === 'Enter') {
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleTagClick(filteredSuggestions[highlightedIndex]);
        }
      } else if (event.key === 'Backspace' && searchTerm === '') {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredSuggestions, highlightedIndex, searchTerm]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);

    if (value) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase()) &&
          !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setSearchTerm('');
    setFilteredSuggestions([]);
  };

  const handleTagRemove = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFilteredSuggestions([]);
    }, 100);
  };

  const handleSuggestionClick = (index) => {
    handleTagClick(filteredSuggestions[index]);
  };

  const highlightMatch = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef}>
      <div className="tags-input">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span className="close-button" onClick={() => handleTagRemove(index)}>
              &times;
            </span>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type to search"
          value={searchTerm}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="search-input"
        />
      </div>
      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              data-index={index}
              className={index === highlightedIndex ? 'highlighted' : ''}
              onMouseDown={() => handleSuggestionClick(index)} // Use onMouseDown instead of onClick
            >
              {highlightMatch(suggestion, searchTerm)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ChipAutoComplete;
