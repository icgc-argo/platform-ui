import React from 'react';
import { ButtonVariant, ButtonSize } from './types';
declare const Button: React.ForwardRefExoticComponent<
  {
    /**
     * Button variant type eg. primary
     */
    variant?: ButtonVariant;
    /**
     * Button size
     */
    size?: ButtonSize;
    children?: React.ReactNode | React.ReactNodeArray;
    disabled?: boolean;
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => any;
    onBlur?: (e: React.SyntheticEvent<HTMLButtonElement>) => any;
    /**
     * Use with async onClick handlers to set loading indicator
     */
    isAsync?: boolean;
    /**
     * DOM pass through
     */
    className?: string;
    /**
     * DOM pass through
     */
    id?: string;
    isLoading?: boolean;
    Loader?: any;
    type?: 'button' | 'submit' | 'reset';
    showLoaderWithChildren?: boolean;
  } & React.RefAttributes<HTMLButtonElement>
>;
export default Button;
