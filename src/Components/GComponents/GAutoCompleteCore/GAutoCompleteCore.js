/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./GAutoCompleteCore.css";

export default function GAutoComplete({
  suggestions,
  suggestionsdata,
  selectedData,
  ...rest
}) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (suggestionsdata !== null && suggestionsdata.length > 0) {
      var _data = null;
      suggestionsdata.forEach((element) => {
        if (input.toLowerCase() === element.data.toLowerCase()) {
          return (_data = element);
        }
      });
      selectedData(_data);
    }
  }, [input]);

  const onChange = (e) => {
    const userInput = e.target.value;
    if (suggestions !== null && suggestions.length > 0) {
      const unLinked = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      setInput(e.target.value);
      setFilteredSuggestions(unLinked.splice(0, 7));
      setActiveSuggestionIndex(-1);
      setShowSuggestions(true);
    } else {
      setInput(e.target.value);
    }

    // Filter our suggestions that don't contain the user's input
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setInput(e.target.value);
      setShowSuggestions(false);
      return e.preventDefault();
    }
    if (e.keyCode === 38) {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      } else {
      }
      return e.preventDefault();
    }
    if (e.keyCode === 40) {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      } else {
      }
      return e.preventDefault();
    }
  };

  const SuggestionsListComponent = (props) => {
    return filteredSuggestions.length ? (
      <div className="gautocomplete-container">
        <div id="sidebar" className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
              props.setInputCallback(suggestion);
            }
            return (
              <li
                data-id={index}
                className={className}
                key={index}
                onFocus={onClick}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="no-suggestions">
        <em>{props.message}</em>
      </div>
    );
  };
  return (
    <>
      <div className="position-relative flex-grow-1 mobWidth100">
        <div className="iconOverInput">{SvgIcons.searchIcon}</div>
        <input
          data-globalid="gautocomplete1245450"
          id={`${rest.id || "gautocomplete"}`}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
          placeholder={rest.placeholder}
          className={rest.className}
        />

        {showSuggestions && input && (
          <SuggestionsListComponent setInputCallback={setInput} />
        )}
      </div>
    </>
  );
}

export const SvgIcons = {
  searchIcon: (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 17.811 17.811"
      >
        <g
          id="Icon_feather-search"
          data-name="Icon feather-search"
          transform="translate(0.75 0.75)"
        >
          <path
            id="Path_1"
            data-name="Path 1"
            d="M18.722,11.611A7.111,7.111,0,1,1,11.611,4.5,7.111,7.111,0,0,1,18.722,11.611Z"
            transform="translate(-4.5 -4.5)"
            fill="none"
            stroke="#20272b"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            id="Path_2"
            data-name="Path 2"
            d="M28.842,28.842l-3.867-3.867"
            transform="translate(-12.842 -12.842)"
            fill="none"
            stroke="#20272b"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </>
  ),
};
