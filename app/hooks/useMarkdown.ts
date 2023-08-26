/*
 * :file description: 
 * :name: /chatgpt/app/hooks/useMarkdown.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-26 23:26:07
 * :last editor: 张德志
 * :date last edited: 2023-08-26 23:26:09
 */
import { useQuery } from '@tanstack/react-query';

export const getMd = async (url: string) => {
  const response = await fetch(`/docs/${url}`);
  const textContent = await response.text();
  return textContent;
};

export const useMarkdown = ({ url }: { url: string }) => {
  const { data = '' } = useQuery([url], () => getMd(url));

  return {
    data
  };
};
