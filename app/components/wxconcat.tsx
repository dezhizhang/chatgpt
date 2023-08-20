/*
 * :file description:
 * :name: /chatgpt/app/components/wxconcat.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 22:33:41
 * :last editor: 张德志
 * :date last edited: 2023-08-20 23:08:50
 */
import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";

export function WxConcat({ onClose }: { onClose: () => void }) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>联系方式-wx</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Image
            style={{ margin: "auto" }}
            src={"https://otnvvf-imgs.oss.laf.run/wx300.jpg"}
            width={"200px"}
            height={"200px"}
            alt=""
          />
        </ModalBody>

        <ModalFooter>
          <Button variant={"base"} onClick={onClose}>
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
