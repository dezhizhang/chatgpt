/*
 * :file description:
 * :name: /chatgpt/app/components/select-csv-modal.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-26 22:29:59
 * :last editor: 张德志
 * :date last edited: 2023-08-26 23:26:38
 */
import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { fileDownload } from "../utils/index";
import { readCsvContent } from "../utils/file";
import { useToast } from "../hooks/useToast";
import { useConfirm } from "../hooks/useConfirm";
import { useSelectFile } from "../hooks/useSelectFile";

const csvTemplate = `question,answer\n"什么是 laf","laf 是一个云函数开发平台……"\n"什么是 sealos","Sealos 是以 kubernetes 为内核的云操作系统发行版,可以……"`;

export function SelectCsvModal({
  onClose,
  onSuccess,
  kbId,
}: {
  onClose: () => void;
  onSuccess: () => void;
  kbId: string;
}) {
  const [selecting, setSelecting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const { File, onOpen } = useSelectFile({ fileType: ".csv", multiple: false });
  const [fileData, setFileData] = useState<{ q: string; a: string }[]>([]);
  const [fileName, setFileName] = useState("");
  const [successData, setSuccessData] = useState(0);
  const { openConfirm, ConfirmChild } = useConfirm({
    content: "确认导入该数据集?",
  });

  const onSelectFile = useCallback(
    async (e: File[]) => {
      const file = e[0];
      setSelecting(true);
      setFileName(file.name);
      try {
        const { header, data } = await readCsvContent(file);
        if (header[0] !== "question" || header[1] !== "answer") {
          throw new Error("csv 文件格式有误");
        }
        setFileData(
          data.map((item: any[]) => ({
            q: item[0] || "",
            a: item[1] || "",
          })),
        );
      } catch (error: any) {
        toast({
          title: "csv 文件格式有误",
          status: "error",
        });
      }
      setSelecting(false);
    },
    [setSelecting, toast],
  );


  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"90vw"} position={"relative"} m={0} h={"90vh"}>
        <ModalHeader>csv 问答对导入</ModalHeader>
        <ModalCloseButton />

        <ModalBody
          h={"100%"}
          display={["block", "flex"]}
          fontSize={"sm"}
          overflowY={"auto"}
        >
          <Box flex={"2 0 0"} w={["100%", 0]} mr={[0, 4]} mb={[4, 0]}>
       
            <Box
              my={3}
              cursor={"pointer"}
              textDecoration={"underline"}
              color={"myBlue.600"}
              onClick={() =>
                fileDownload({
                  text: csvTemplate,
                  type: "text/csv",
                  filename: "template.csv",
                })
              }
            >
              点击下载csv模板
            </Box>
            <Box>
              <Button
                isLoading={selecting}
                isDisabled={uploading}
                onClick={onOpen}
              >
                选择 csv 问答对
              </Button>
              <Box mt={4}>
                【{fileName}】一共有 {fileData.length}{" "}
                组数据（下面最多展示100组）
              </Box>
            </Box>
          </Box>
          <Box
            flex={"3 0 0"}
            h={"100%"}
            overflow={"auto"}
            p={2}
            backgroundColor={"blackAlpha.50"}
          >
            {fileData.slice(0, 100).map((item, index) => (
              <Box key={index}>
                <Box>
                  Q{index + 1}. {item.q}
                </Box>
                <Box>
                  A{index + 1}. {item.a}
                </Box>
              </Box>
            ))}
          </Box>
        </ModalBody>

        <Flex px={6} pt={2} pb={4}>
          <Box flex={1}></Box>
          <Button
            variant={"base"}
            isLoading={uploading}
            mr={3}
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            isDisabled={fileData.length === 0 || uploading}
            // onClick={openConfirm(mutate)}
          >
            {uploading ? (
              <Box>{Math.round((successData / fileData.length) * 100)}%</Box>
            ) : (
              "确认导入"
            )}
          </Button>
        </Flex>
      </ModalContent>
      <ConfirmChild />
      <File onSelect={onSelectFile} />
    </Modal>
  );
}
