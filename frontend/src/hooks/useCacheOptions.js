import { useEffect, useState } from "react";

const useCacheOptions = (cachename) => {
  
  const [options, setOptions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [suggestion, setSuggestions] = useState("");

  useEffect(() => {
  const cachedSuggestions = localStorage.getItem(cachename);
  if (cachedSuggestions) {
      setSuggestions(JSON.parse(cachedSuggestions));
  }
  }, [cachename]);

  const handleInputChange = (e) => {
  const userInput = e.target.value;
  setOptions(userInput);

  const mockSuggestions = ["Brakes", "Handlebars", "Seat", "Oil"];
  const filteredSuggestions = mockSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
  );

  setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
  setOptions(suggestion);
  setSuggestions([]);
  };

  const handleInputFocus = () => {
  setIsInputFocused(true);
  };

  const handleInputBlur = () => {
      setTimeout(() => {
      setIsInputFocused(false);
      }, 300);
  };

  return {
    options,
    isInputFocused, 
    suggestion,
    handleInputChange,
    handleSuggestionClick,
    handleInputFocus,
    handleInputBlur
  }
}
 
export default useCacheOptions;