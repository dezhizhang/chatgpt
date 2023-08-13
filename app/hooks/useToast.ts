/*
 * :file description: 
 * :name: /chatgpt/app/hooks/useToast.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 20:57:10
 * :last editor: 张德志
 * :date last edited: 2023-08-13 20:57:12
 */
import { useToast as uToast, UseToastOptions } from '@chakra-ui/react';

export const useToast = (props?: UseToastOptions) => {
  const toast = uToast({
    position: 'top',
    duration: 2000,
    ...props
  });

  return {
    toast
  };
};
