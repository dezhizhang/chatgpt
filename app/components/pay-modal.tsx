/*
 * :file description:
 * :name: /chatgpt/app/components/pay-modal.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 22:07:03
 * :last editor: 张德志
 * :date last edited: 2023-08-26 11:45:08
 */

import React, { useState, useCallback } from "react";
//@ts-ignore
import QRCode from "qrcodejs2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ChakraProvider,
  Button,
  Input,
  Box,
  Grid,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { useToast } from "../hooks/useToast";
import { getPayCode } from "../api/user";

export function PayModal({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState<number | "">("");
  const [payId, setPayId] = useState("");

  const handleClickPay = useCallback(async () => {
    if (!inputVal || inputVal <= 0 || isNaN(+inputVal)) return;
    setLoading(true);
    // 获取支付二维码
    const res = await getPayCode(inputVal);

    new QRCode(document.getElementById("payQRCode") as HTMLElement, {
      text: res.codeUrl,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode?.CorrectLevel?.H,
    });
    setPayId(res.payId);
    setLoading(false);
  }, [inputVal, toast]);

  return (
    <ChakraProvider theme={theme}>
      <Modal
        isOpen={true}
        onClose={() => {
          if (payId) return;
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent minW={"auto"}>
          <ModalHeader>充值</ModalHeader>
          <ModalCloseButton onClick={() => onClose()} />
          <ModalBody py={0}>
            {!payId && (
              <>
                <Grid gridTemplateColumns={"repeat(4,1fr)"} gridGap={5} mb={4}>
                  {[10, 20, 50, 100].map((item) => (
                    <Button
                      key={item}
                      variant={item === inputVal ? "solid" : "outline"}
                      onClick={() => setInputVal(item)}
                    >
                      {item}元
                    </Button>
                  ))}
                </Grid>
                <Box mb={4}>
                  <Input
                    value={inputVal}
                    type={"number"}
                    step={1}
                    style={{ maxWidth: "100%", borderRadius: "4px" }}
                    placeholder={"其他金额，请取整数"}
                    onChange={(e) => {
                      setInputVal(Math.floor(+e.target.value));
                    }}
                  ></Input>
                </Box>
              </>
            )}
            {/* 付费二维码 */}
            <Box textAlign={"center"}>
              {payId && (
                <Box mb={3}>请微信扫码支付: {inputVal}元，请勿关闭页面</Box>
              )}
              <Box id={"payQRCode"} display={"inline-block"}></Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            {!payId && (
              <>
                <Button variant={"base"} onClick={onClose}>
                  取消
                </Button>
                <Button
                  ml={3}
                  isLoading={loading}
                  isDisabled={!inputVal || inputVal === 0}
                  onClick={handleClickPay}
                >
                  获取充值二维码
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
