import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import PropTypes from "prop-types";

class AutoCompleteInput extends Component {

  state = {
    value: "",
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.state.value = props.value || "";

  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const { list } = this.props;
    return inputLength === 0 ? [] : list.filter(lang =>
      lang.countryName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.countryName;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.countryName}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };


  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, value) => {
    console.log({dd: value.suggestion})
    this.props.onChange(value.suggestion);
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Select Country",
      value,
      onChange: this.onChange
    };

    const theme = {
      input: "react-autosuggest__input form-control",
      inputOpen: "react-autosuggest__input--open form-control",
      inputFocused: "react-autosuggest__input--focused form-control",
      suggestionsList: "react-autosuggest__suggestions-list pointer p-2"
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    );
  }
}

AutoCompleteInput.propTypes = {
  list: PropTypes.array.isRequired
};


export default AutoCompleteInput;