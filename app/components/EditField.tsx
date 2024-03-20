import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Label } from 'tamagui';

interface ButtonProps {
  title: string;
  label: string;
  onSubmit: (newTitle: string) => void;
}

const EditableButton = ({ title, label, onSubmit } : ButtonProps) => {
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
    <>
        <Label>
          {label}
        </Label>
        <Button title={newTitle} onPress={handleEditClick} />
    </>
    
  );
}

export default EditableButton;