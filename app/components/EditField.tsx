import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

interface ButtonProps {
  title: string;
  onSubmit: (newTitle: string) => void;
}

const EditableButton = ({ title, onSubmit } : ButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const os = onSubmit;

  const handleInputChange = (text: string) => {
    setNewTitle(text);
  };

  const handleSubmitClick = () => {
    onSubmit(newTitle);
    setIsEditing(false);
  };
  if (isEditing) {
    return <>
        <TextInput
          value={newTitle}
          onChangeText={handleInputChange}
        />
        <Button title="Submit" onPress={handleSubmitClick} />
    </>
  }
  return (
    <Button title={newTitle} onPress={handleEditClick} />
  );
}

export default EditableButton;