import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from './App';
import TaskForm from './components/TaskForm';

describe('TEST APP', () => {
    test('reneder button in Task Form', () => {
        render(<TaskForm />);
        const btn = screen.getByRole('button')
        expect(btn).toBeInTheDocument()
    });
    test('reneder 2 inputs in Task Form', () => {
        render(<TaskForm />);
        const inputs = screen.getAllByRole('textbox')
        expect(inputs).toHaveLength(2)
    });


})


