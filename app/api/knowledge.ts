/*
 * :file description:
 * :name: /chatgpt/app/api/knowledge.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-21 22:09:20
 * :last editor: 张德志
 * :date last edited: 2023-08-27 10:12:38
 */
import { GET, POST, PUT, DELETE } from "./request";
import type { KbItemType, RequestPaging,KbUpdateParams } from "../typing";

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

/**
 * 更新一条数据
 */
export const putKbDataById = (data: {
  dataId: string;
  a: string;
  q?: string;
}) => PUT("/openapi/kb/updateData", data);

/**
 * 直接push数据
 */
export const postKbDataFromList = (data: any) =>
  POST<any>(`/openapi/kb/pushData`, data);

/**
 * 获取导出数据（不分页）
 */
export const getExportDataList = (kbId: string) =>
  GET<[string, string, string][]>(
    `/plugins/kb/data/exportModelData`,
    { kbId },
    {
      timeout: 600000,
    },
  );

/**
 * 获取模型正在拆分数据的数量
 */
export const getTrainingData = (data: { kbId: string; init: boolean }) =>
  POST<{
    qaListLen: number;
    vectorListLen: number;
  }>(`/plugins/kb/data/getTrainingData`, data);

/**
 * 删除一条知识库数据
 */
export const delOneKbDataByDataId = (dataId: string) =>
  DELETE(`/openapi/kb/delDataById?dataId=${dataId}`);

/**
 * 拆分数据
 */
export const postSplitData = (data: {
  kbId: string;
  chunks: string[];
  prompt: string;
  mode: any;
}) => POST(`/openapi/text/pushData`, data);

export const searchText = (data: any) =>
  POST<any>(`/openapi/kb/searchTest`, data);

export const getKbById = (id: string) => GET<KbItemType>(`/plugins/kb/detail?id=${id}`);

export const delKbById = (id: string) => DELETE(`/plugins/kb/delete?id=${id}`);

export const putKbById = (data: KbUpdateParams) => PUT(`/plugins/kb/update`, data);


