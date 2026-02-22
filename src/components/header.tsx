import React from "react";
import TodoTextInput from "./todo-text-input";

const Header = ({ onNewItem }: { onNewItem: (text: string) => void }) => (
  <header className="header">
    <h1>todos every one</h1>
    <TodoTextInput
      initial=""
      placeholder="What needs to be done today?"
      onSubmit={onNewItem}
    />
  </header>
);

export default Header;
