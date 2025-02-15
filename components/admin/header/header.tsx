"use client";

import { Avatar, Button, Divider, Flex, Heading, Highlight, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { UserInfo } from "@/types/api-types";
import Link from "next/link";

export default function AdminHeader() {
    const { data: session, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    useEffect(() => {
        if (!session) {
            return;
        }

        fetch(`/api/admin/fetchUser?email=${session.user.email}`)
            .then(response => response.json())
            .then((data: UserInfo) => {
                setUserInfo(data);
            })
            .catch(error => {
                console.error('API error:', error);
            });

    }, [session, status]);

    return (
        <Flex
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={4}
            bg={"gray.800"}
            color={"white"}
        >
            <Flex>
                <Link href={'/admin'}>
                    <Heading>Admin Dashboard</Heading>
                </Link>
            </Flex>
            <Flex>
                {
                    userInfo ? (
                        <Avatar
                            name={userInfo.owner_name}
                            cursor={'pointer'}
                            onClick={onOpen}
                            size={'md'}
                        />
                    ) : (
                        <Spinner
                            size={'md'}
                        />
                    )
                }
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Account</DrawerHeader>
                    {
                        userInfo && (
                            <DrawerBody>
                                <Flex
                                    flexDir={'column'}
                                    justifyContent={'center'}
                                    alignItems={'left'}
                                >
                                    <Text mb={5}>
                                        Hi, {userInfo.owner_name.split(' ')[0]}
                                    </Text>
                                    <Divider />
                                    <Flex
                                        flexDir={'column'}
                                        justifyContent={'left'}
                                        alignItems={'left'}
                                        mt={5}
                                    >
                                        <Heading size={'md'} mb={5}>Your Profile</Heading>
                                        <Text mb={5}>
                                            <Text fontSize={'lg'}>Name:</Text>
                                            <Highlight query={'Name:'}>
                                                {userInfo.owner_name}
                                            </Highlight>
                                        </Text>
                                        <Text mb={5}>
                                            <Text fontSize={'lg'}>Email:</Text>
                                            <Highlight query={'Email:'}>
                                                {session.user.email}
                                            </Highlight>
                                        </Text>
                                    </Flex>
                                </Flex>
                            </DrawerBody>
                        )
                    }
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={() => {
                            signOut({
                                callbackUrl: '/'
                            })
                            onClose()
                        }}>
                            Log out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}