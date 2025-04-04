import { createContext } from 'react';
import { EditableContectProps } from '../model/dataVariables';

export const EditableContext = createContext<EditableContectProps | null>(null);
