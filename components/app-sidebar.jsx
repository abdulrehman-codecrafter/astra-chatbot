"use client";
import { useState } from "react";
import { GalleryVerticalEnd, Pencil } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ConversationLoader } from "@/components/chat-loader";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useConversationContext } from "@/contexts/conversationsContext";
import { usePathname } from "next/navigation";
import { BlurFade } from "./magicui/blur-fade";
import { cn } from "@/lib/utils";
import axios from "axios";

export function AppSidebar({ ...props }) {
    const { conversations, loading, dispatch } = useConversationContext();
    const pathname = usePathname();
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState("");

    const handleEdit = (id, name) => {
        setEditingId(id);
        setNewName(name);
    };

    const handleSave = async (id) => {
        try {
            const res = await axios.patch(`/api/conversations/${id}`, {
                newName,
            });
            dispatch({
                type: "UPDATE_CONVERSATION",
                payload: res.data.conversation,
            });
        } catch (err) {
            console.log(err)
        }
        setEditingId(null);
    };

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">
                                        Astrabot AI{" "}
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        <div className="font-medium mt-4 text-[13px]">
                            Previous Conversations
                        </div>
                        {loading ? (
                            <div className="flex gap-2 mt-2">
                                <ConversationLoader />
                                <p className="text-[13px] font-light animate-pulse">
                                    Loading Conversations
                                </p>
                            </div>
                        ) : (
                            <div>
                                {conversations.map((item, idx) => {
                                    const isActive =
                                        pathname === `/chat/${item._id}`;
                                    return (
                                        <SidebarMenuItem
                                            key={item._id}
                                            className="my-1.5 flex items-center gap-2"
                                        >
                                            <BlurFade
                                                key={item._id}
                                                delay={0.02 + idx * 0.01}
                                                inView
                                            >
                                                {isActive &&
                                                editingId === item._id ? (
                                                    <input
                                                        type="text"
                                                        value={newName}
                                                        onChange={(e) =>
                                                            setNewName(
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            handleSave(item._id)
                                                        }
                                                        autoFocus
                                                        className="bg-transparent  border-gray-400  text-black px-2 py-0.5 font-light text-[14px] rounded-md w-fit "
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/chat/${item._id}`}
                                                        >
                                                            <div className="flex gap-2">
                                                                <div
                                                                    className={cn(
                                                                        "font-light text-[14px] text-gray-500 tracking-wide line-clamp-1 ",
                                                                        {
                                                                            "text-black text-[14.5px] font-[300]":
                                                                                isActive,
                                                                        }
                                                                    )}
                                                                >
                                                                    {
                                                                        item.conversationName
                                                                    }
                                                                </div>
                                                                {/* <div className="font-light text-[9px] text-gray-900 mt-2.5 ms-4">
                                                                    {new Date(
                                                                        item.updatedAt
                                                                    ).toLocaleDateString(
                                                                        "en-GB",
                                                                        {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                        }
                                                                    )}
                                                                </div> */}
                                                            </div>
                                                        </Link>
                                                        {isActive && (
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item._id,
                                                                        item.conversationName
                                                                    )
                                                                }
                                                                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                                                            >
                                                                <Pencil className=" ms-1 size-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </BlurFade>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </div>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserButton showName={true} />
            </SidebarFooter>
        </Sidebar>
    );
}
