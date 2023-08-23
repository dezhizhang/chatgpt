/*
 * :file description:
 * :name: /chatgpt/app/api/knowledge.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 22:09:20
 * :last editor: 张德志
 * :date last edited: 2023-08-23 20:30:11
 */
import { GET, POST, PUT, DELETE } from "./request";
import type { KbItemType, RequestPaging } from "../typing";

export const getKbList = () => GET<KbItemType[]>(`/plugins/kb/list`);

export const postCreateKb = (data: { name: string }) =>
  POST<string>(`/plugins/kb/create`, data);

/* kb data */
type GetKbDataListProps = RequestPaging & {
  kbId: string;
  searchText: string;
};
export const getKbDataList = (data: GetKbDataListProps) =>
  POST<any>(`/plugins/kb/data/getDataList`, data);
