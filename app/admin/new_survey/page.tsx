"use client";
import { SurveyQuestion } from "@/types/api-types";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { Suspense, useState } from "react";

import { CircleX, Plus, Save } from "lucide-react";

export default function NewSurvey() {
    useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        }
    })

    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);

    const handleCreateNewQuestion = (after_index: number | null) => {
        if (after_index === null) {
            setQuestions([...questions, {
                question_index: 0,
                question_value: '',
                question_reply: '',
                question_type: "TEXT",
                reply_markup: JSON.parse('{}'),
            }]);
        } else {
            const new_questions = [...questions];
            new_questions.splice(after_index + 1, 0, {
                question_index: 0,
                question_value: '',
                question_reply: '',
                question_type: "TEXT",
                reply_markup: JSON.parse('{}'),
            });
            setQuestions(new_questions);
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                p={8}
                pb={20}
            >
                <Flex
                    flexDir={'column'}
                >
                    <Flex
                        flexDir={'row'}
                        justify={'space-between'}
                        align={'center'}
                        w={'100%'}
                    >
                        <Heading className="text-4xl font-bold mb-4 text-gray-800">
                            Create a new survey
                        </Heading>
                        <Flex
                            flexDir={'row'}
                            align={'center'}
                        >
                            <Button
                                borderRadius={'full'}
                                colorScheme={'green'}
                                mr={2}
                            >
                                <Save />
                            </Button>
                            <Button
                                borderRadius={'full'}
                                colorScheme={'red'}
                            >
                                <CircleX />
                            </Button>
                        </Flex>
                    </Flex>
                    <Flex
                        flexDir={'column'}
                        w={'60vw'}
                        p={4}
                        bg={'cyan.100'}
                        rounded={'md'}
                    >
                        {
                            questions.length === 0 ? (
                                <Flex
                                    w={'full'}
                                    flexDir={'column'}
                                >
                                    <Text>
                                        You have no questions. Get started by creating a new question.
                                    </Text>
                                    <Flex
                                        justify={'flex-end'}
                                    >
                                        <Button
                                            borderRadius={'full'}
                                            colorScheme={'green'}
                                            w={'fit-content'}
                                            onClick={() => handleCreateNewQuestion(null)}
                                        >
                                            <Plus />
                                        </Button>
                                    </Flex>
                                </Flex>
                            ) : (
                                <Flex
                                    w={'full'}
                                    flexDir={'column'}
                                >
                                    {questions.map((question) => (
                                        <Flex
                                            key={questions.indexOf(question)}
                                            flexDir={'column'}
                                        >
                                            <Flex
                                                mt={5}
                                                justify={'flex-end'}
                                            >
                                                <Button
                                                    borderRadius={'full'}
                                                    colorScheme={'green'}
                                                    w={'fit-content'}
                                                    onClick={() => handleCreateNewQuestion(questions.indexOf(question))}
                                                >
                                                    <Plus />
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>
                            )
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Suspense>
    );
}
