"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function AdminHeader() {
    const { data: session, status } = useSession();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        if (!session) {
            return;
        }

        fetch(`/api/admin/fetchUser?email=${session.user.email}`)
            .then(response => response.json())
            .then((data: any) => {
                setUserName(data[0].owner_name);
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
                <Heading>Admin Dashboard</Heading>
            </Flex>
            <Flex>
                <Heading size={'md'}>Hi, {userName}</Heading>
            </Flex>
        </Flex>
    )
}