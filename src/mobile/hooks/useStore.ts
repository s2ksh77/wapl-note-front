import React from 'react';
import { RootStore } from "@wapl/note-core";

const instance = new RootStore();
const context = React.createContext(instance)
export const useStore = () => React.useContext(context);
