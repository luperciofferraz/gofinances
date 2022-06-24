import React from 'react';
import { render } from '@testing-library/react-native';
import { Profile } from '../../screens/Profile';

describe('Profile Screen', () => {

    it('should show input Name placeholder', () => {
        const { getAllByPlaceholderText } = render(<Profile />);
    
        const inputName = getAllByPlaceholderText('Nome');
    
        expect(inputName).toBeTruthy();
    });
    
    it('should load user data', () => {
        const { getByTestId } = render(<Profile />);
    
        const inputName = getByTestId('input-name');
    
        const inputSurname = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Rodrigo');
        expect(inputSurname.props.value).toEqual('Gonçalves');
    });
    
    it('should render title', () => {
        const { getByTestId } = render(<Profile />);
    
        const textTitle = getByTestId('text-title');
    
        expect(textTitle.props.children).toContain('Perfil');
    });

});

