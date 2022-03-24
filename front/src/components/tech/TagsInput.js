import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { TextField } from "@mui/material";
import Downshift from "downshift";
import TechTag from "./TechTag";

export default function TagsInput({ ...props }) {
  const { selectedTags, placeholder, tags, ...other } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(tags);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  useEffect(() => {
    setSelectedItem(tags);
    if (tags.length >= 1) setCurrentPlaceholder("");
  }, [tags]);
  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
      placeholderCheck();
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
      placeholderCheck();
    }
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  function placeholderCheck() {
    if (selectedItem.length > 1) setCurrentPlaceholder("");
    else {
      setCurrentPlaceholder(placeholder);
    }
  }
  const handleDelete = (item) => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
    placeholderCheck();
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder: currentPlaceholder,
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map((item, idx) => (
                    <TechTag
                      key={idx}
                      tabIndex={-1}
                      tag={item}
                      isDeletable={true}
                      deleteHandler={handleDelete}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
TagsInput.defaultProps = {
  tags: [],
};
TagsInput.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
