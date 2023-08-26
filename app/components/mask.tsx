/*
 * :file description:
 * :name: /chatgpt/app/components/mask.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-11 05:21:09
 * :last editor: 张德志
 * :date last edited: 2023-08-26 16:09:19
 */
import { useEffect,useMemo } from "react";
import { IconButton } from "./button";
import { ErrorBoundary } from "./error";
import styles from "./mask.module.scss";
import EditIcon from "../icons/edit.svg";
import AddIcon from "../icons/add.svg";
import CloseIcon from "../icons/close.svg";
import DeleteIcon from "../icons/delete.svg";
import EyeIcon from "../icons/eye.svg";
import { InputRange } from "./input-range";
import DragIcon from "../icons/drag.svg";
import { useToast } from '../hooks/useToast';
import {
  getModelList,
  deleteMode,
  createModel,
  getModelById,
  putModelById,
} from "../api/chat";
import { formatPrice } from "../utils/index";
import { DEFAULT_MASK_AVATAR, Mask, useMaskStore } from "../store/mask";
import { ChatMessage, createMessage, useChatStore } from "../store";
import { ROLES } from "../client/api";
import {
  Input,
  List,
  ListItem,
  Modal,
  Popover,
  Select,
  showConfirm,
} from "./ui-lib";
import { Avatar, AvatarPicker } from "./emoji";
import Locale, { AllLangs, ALL_LANG_OPTIONS, Lang } from "../locales";
import { useNavigate } from "react-router-dom";
import chatStyle from "./chat.module.scss";
import { useState } from "react";
import { Path, chatModelList, ChatModelMap } from "../constant";
import { BUILTIN_MASK_STORE } from "../masks";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

// drag and drop helper function
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function MaskAvatar(props: { mask: Mask }) {
  return props.mask.avatar !== DEFAULT_MASK_AVATAR ? (
    <Avatar avatar={props.mask.avatar} />
  ) : (
    <Avatar model={props.mask.modelConfig.model} />
  );
}

export function MaskConfig(props: {
  mask: Mask;
  setMaskConfig: any;
  extraListItems?: JSX.Element;
  readonly?: boolean;
  maskConfig: any;
  shouldSyncFromGlobal?: boolean;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const { maskConfig } = props || {};

  return (
    <div style={{ height: "600px" }}>
      <List>
        <ListItem title={Locale.Mask.Config.Avatar}>
          <Popover
            content={
              <AvatarPicker
                onEmojiClick={(emoji) => {
                  // props.updateMask((mask) => (mask.avatar = emoji));
                  // setShowPicker(false);
                }}
              ></AvatarPicker>
            }
            open={showPicker}
            onClose={() => setShowPicker(false)}
          >
            <div
              onClick={() => setShowPicker(true)}
              style={{ cursor: "pointer" }}
            >
              <MaskAvatar mask={props.mask} />
            </div>
          </Popover>
        </ListItem>
        <ListItem title={"名称"}>
          <input
            type="text"
            value={maskConfig?.name}
            onInput={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  name: value,
                };
              });
            }}
          ></input>
        </ListItem>
        <ListItem title={"介绍"}>
          <textarea
            value={maskConfig?.intro}
            className={styles["mak-textarea"]}
            rows={2}
            placeholder="给你的 AI 应用一个介绍"
            onChange={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  intro: value,
                };
              });
            }}
          ></textarea>
        </ListItem>
        <ListItem title={"对话模型"}>
          <Select
            value={maskConfig?.chat?.chatModel}
            onChange={(e) => {
              const value = e.target.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  chat: {
                    ...old?.chat,
                    chatModel: value,
                  },
                };
              });
            }}
          >
            {chatModelList.map((item) => (
              <option value={item.chatModel} key={item.chatModel}>
                {`${item.name}\t(${formatPrice(
                  (ChatModelMap as any)[item.chatModel].price,
                  1000,
                )}) 元/1k tokens`}
              </option>
            ))}
          </Select>
        </ListItem>
        <ListItem title={"温度"}>
          <InputRange
            value={maskConfig?.chat?.temperature}
            min="0"
            max="10"
            step="1"
            onChange={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  chat: {
                    ...old?.chat,
                    temperature: Number.parseInt(value),
                  },
                };
              });
            }}
          ></InputRange>
        </ListItem>
        <ListItem title={"回复上限"}>
          <InputRange
            value={maskConfig?.chat?.maxToken}
            min="100"
            max="8000"
            step="100"
            onChange={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                console.log("old", old);
                return {
                  ...old,
                  chat: {
                    ...old?.chat,
                    maxToken: value,
                  },
                };
              });
            }}
          ></InputRange>
        </ListItem>

        <ListItem title={"提示词"}>
          <textarea
            value={maskConfig?.chat?.systemPrompt}
            className={styles["mak-textarea"]}
            placeholder="模型固定的引导词，通过调整该内容，可以引导模型聊天方向。该内容会被固定在上下文的开头。"
            onChange={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  chat: {
                    ...old?.chat,
                    systemPrompt: value,
                  },
                };
              });
            }}
          ></textarea>
        </ListItem>
        <ListItem title={"限定词"}>
          <textarea
            value={maskConfig?.chat.limitPrompt}
            onChange={(e) => {
              const value = e.currentTarget.value;
              props.setMaskConfig((old: any) => {
                return {
                  ...old,
                  chat: {
                    ...old?.chat,
                    limitPrompt: value,
                  },
                };
              });
            }}
            className={styles["mak-textarea"]}
            placeholder='限定模型对话范围，会被放置在本次提问前，拥有强引导和限定性。例如:
          1. 知识库是关于 Laf 的介绍，参考知识库回答问题，与 "Laf" 无关内容，直接回复: "我不知道"。
          2. 你仅回答关于 "xxx" 的问题，其他问题回复: "xxxx"'
          ></textarea>
        </ListItem>
      </List>
    </div>
  );
}

function ContextPromptItem(props: {
  index: number;
  prompt: ChatMessage;
  update: (prompt: ChatMessage) => void;
  remove: () => void;
}) {
  const [focusingInput, setFocusingInput] = useState(false);

  return (
    <div className={chatStyle["context-prompt-row"]}>
      {!focusingInput && (
        <>
          <div className={chatStyle["context-drag"]}>
            <DragIcon />
          </div>
          <Select
            value={props.prompt.role}
            className={chatStyle["context-role"]}
            onChange={(e) =>
              props.update({
                ...props.prompt,
                role: e.target.value as any,
              })
            }
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </>
      )}
      <Input
        value={props.prompt.content}
        type="text"
        className={chatStyle["context-content"]}
        rows={focusingInput ? 5 : 1}
        onFocus={() => setFocusingInput(true)}
        onBlur={() => {
          setFocusingInput(false);
          // If the selection is not removed when the user loses focus, some
          // extensions like "Translate" will always display a floating bar
          window?.getSelection()?.removeAllRanges();
        }}
        onInput={(e) =>
          props.update({
            ...props.prompt,
            content: e.currentTarget.value as any,
          })
        }
      />
      {!focusingInput && (
        <IconButton
          icon={<DeleteIcon />}
          className={chatStyle["context-delete-button"]}
          onClick={() => props.remove()}
          bordered
        />
      )}
    </div>
  );
}

export function ContextPrompts(props: {
  context: ChatMessage[];
  updateContext: (updater: (context: ChatMessage[]) => void) => void;
}) {
  const context = props.context;

  const addContextPrompt = (prompt: ChatMessage, i: number) => {
    props.updateContext((context) => context.splice(i, 0, prompt));
  };

  const removeContextPrompt = (i: number) => {
    props.updateContext((context) => context.splice(i, 1));
  };

  const updateContextPrompt = (i: number, prompt: ChatMessage) => {
    props.updateContext((context) => (context[i] = prompt));
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) {
      return;
    }
    const newContext = reorder(
      context,
      result.source.index,
      result.destination.index,
    );
    props.updateContext((context) => {
      context.splice(0, context.length, ...newContext);
    });
  };

  return (
    <>
      <div className={chatStyle["context-prompt"]} style={{ marginBottom: 20 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="context-prompt-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {context.map((c, i) => (
                  <Draggable
                    draggableId={c?._id || i.toString()}
                    index={i}
                    key={c?._id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ContextPromptItem
                          index={i}
                          prompt={c}
                          update={(prompt) => updateContextPrompt(i, prompt)}
                          remove={() => removeContextPrompt(i)}
                        />
                        <div
                          className={chatStyle["context-prompt-insert"]}
                          onClick={() => {
                            addContextPrompt(
                              createMessage({
                                role: "user",
                                content: "",
                                // date: new Date().toLocaleString(),
                              }),
                              i + 1,
                            );
                          }}
                        >
                          <AddIcon />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {props.context.length === 0 && (
          <div className={chatStyle["context-prompt-row"]}>
            <IconButton
              icon={<AddIcon />}
              text={Locale.Context.Add}
              bordered
              className={chatStyle["context-prompt-button"]}
              onClick={() =>
                addContextPrompt(
                  createMessage({
                    role: "user",
                    content: "",
                    // date: "",
                  }),
                  props.context.length,
                )
              }
            />
          </div>
        )}
      </div>
    </>
  );
}

export function MaskPage() {
  const [masks, setMasks] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const maskStore = useMaskStore();
  const chatStore = useChatStore();
  const [filterLang, setFilterLang] = useState<Lang>();
  const [maskConfig, setMaskConfig] = useState();
  const [searchText, setSearchText] = useState("");
  const [modelId, setModelId] = useState<string>("");
  const [editingMaskId, setEditingMaskId] = useState<string | undefined>();
  // 获取所有模型

  const fetchModelList = async () => {
    const res = await getModelList();
    setMasks(res?.myModels || []);
  };

  // 编辑模型
  const handleEdit = async (item: any) => {
    const res = await getModelById(item?._id);
    setMaskConfig(res);
    const createdMask = maskStore.create();
    setModelId(item?._id);
    setEditingMaskId(createdMask._id);
  };

  useEffect(() => {
    fetchModelList();
  }, []);

  const currentMask = useMemo(()=>{
    return masks.filter((item) => new RegExp(searchText,'ig').test(item.name + item.intro))
  },[masks,searchText]);

  const editingMask =
    maskStore.get(editingMaskId) ?? BUILTIN_MASK_STORE.get(editingMaskId);
  const closeMaskModal = () => setEditingMaskId(undefined);

  const handleSubmit = async () => {
    console.log({ modelId });
    try {
      await putModelById(modelId, maskConfig);
      toast({
        title:'更新面具成功',
        status:'success'
      })
      fetchModelList();
      closeMaskModal();
    } catch (error) {
      toast({
        title:'更新面具失败',
        status:'error'
      });
    }
  };
  
  return (
    <ErrorBoundary>
      <div className={styles["mask-page"]}>
        <div className="window-header">
          <div className="window-header-title">
            <div className="window-header-main-title">
              {Locale.Mask.Page.Title}
            </div>
            <div className="window-header-submai-title">
              {Locale.Mask.Page.SubTitle(masks?.length)}
            </div>
          </div>

          <div className="window-actions">
            <div className="window-action-button">
              <IconButton
                icon={<CloseIcon />}
                bordered
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
        </div>

        <div className={styles["mask-page-body"]}>
          <div className={styles["mask-filter"]}>
            <input
              type="text"
              className={styles["search-bar"]}
              placeholder={Locale.Mask.Page.Search}
              autoFocus
              onInput={(e) => setSearchText(e.currentTarget.value)}
            />
            <Select
              className={styles["mask-filter-lang"]}
              value={filterLang ?? Locale.Settings.Lang.All}
              onChange={(e) => {
                const value = e.currentTarget.value;
                if (value === Locale.Settings.Lang.All) {
                  setFilterLang(undefined);
                } else {
                  setFilterLang(value as Lang);
                }
              }}
            >
              <option key="all" value={Locale.Settings.Lang.All}>
                {Locale.Settings.Lang.All}
              </option>
              {AllLangs.map((lang) => (
                <option value={lang} key={lang}>
                  {ALL_LANG_OPTIONS[lang]}
                </option>
              ))}
            </Select>

            <IconButton
              className={styles["mask-create"]}
              icon={<AddIcon />}
              text={Locale.Mask.Page.Create}
              bordered
              onClick={async () => {
                if (await showConfirm(Locale.Mask.Item.CreateConfirm, 500)) {
                  await createModel({ name: `AI应用${masks.length + 1}` });
                  await fetchModelList();
                }
              }}
            />
          </div>

          <div>
            {currentMask.map((m) => (
              <div className={styles["mask-item"]} key={m?._id}>
                <div className={styles["mask-header"]}>
                  <div className={styles["mask-icon"]}>
                    <MaskAvatar mask={m} />
                  </div>
                  <div className={styles["mask-title"]}>
                    <div className={styles["mask-name"]}>{m?.name}</div>
                  </div>
                </div>
                <div className={styles["mask-actions"]}>
                  <IconButton
                    icon={<AddIcon />}
                    text={Locale.Mask.Item.Chat}
                    onClick={() => {
                      chatStore.newSession(m);
                      navigate(Path.Chat);
                    }}
                  />
                  {m.builtin ? (
                    <IconButton
                      icon={<EyeIcon />}
                      text={Locale.Mask.Item.View}
                      onClick={() => setEditingMaskId(m?._id)}
                    />
                  ) : (
                    <IconButton
                      icon={<EditIcon />}
                      text={Locale.Mask.Item.Edit}
                      onClick={() => handleEdit(m)}
                    />
                  )}
                  {!m.builtin && (
                    <IconButton
                      icon={<DeleteIcon />}
                      text={Locale.Mask.Item.Delete}
                      onClick={async () => {
                        if (
                          await showConfirm(Locale.Mask.Item.DeleteConfirm, 500)
                        ) {
                          await deleteMode(m?._id);
                          toast({
                            title:'删除成功',
                            status:'success',
                          })
                          fetchModelList();
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingMask && (
        <div className="modal-mask">
          <Modal
            title={Locale.Mask.EditModal.Title(editingMask?.builtin)}
            onClose={closeMaskModal}
            actions={[
              <IconButton
                text={"取消"}
                key="export"
                bordered
                onClick={() => closeMaskModal()}
              />,
              <IconButton
                key="copy"
                type="primary"
                bordered
                text={"确定"}
                onClick={handleSubmit}
              />,
            ]}
          >
            <MaskConfig
              mask={editingMask}
              maskConfig={maskConfig}
              setMaskConfig={setMaskConfig}
              readonly={editingMask.builtin}
            />
          </Modal>
        </div>
      )}
    </ErrorBoundary>
  );
}
