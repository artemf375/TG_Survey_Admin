"use client";
import { SurveyQuestion } from "@/types/api-types";
import { Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Text, Select } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { Suspense, useState } from "react";

import { CircleX, Plus, Save, X } from "lucide-react";
import DragDropGrid from "@/components/admin/new_survey/dragAndDrop";

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

    const handleSaveSurvey = async () => {
        console.log(questions);
    }

    // useEffect(() => {
    //     setQuestions([{
    //         question_index: 0,
    //         question_value: '',
    //         question_reply: '',
    //         question_type: "TEXT",
    //         reply_markup: JSON.parse('{}'),
    //     }]);
    // }, [])

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
                                onClick={handleSaveSurvey}
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
                                            colorScheme={'blue'}
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
                                                flexDir={'row'}
                                                justify={'space-between'}
                                                w={'full'}
                                                mt={5}
                                            >
                                                <Heading
                                                    mb={5}
                                                >
                                                    Question {questions.indexOf(question) + 1}
                                                </Heading>
                                                <Button
                                                    borderRadius={'full'}
                                                    backgroundColor={'gray.100'}
                                                    onClick={() => {
                                                        const new_questions = [...questions];
                                                        new_questions.splice(questions.indexOf(question), 1);
                                                        setQuestions(new_questions);
                                                    }}
                                                >
                                                    <X />
                                                </Button>
                                            </Flex>
                                            <FormControl>
                                                <Flex
                                                    flexDir={'row'}
                                                    justify={'space-between'}
                                                    w={'full'}
                                                    pb={2}
                                                >
                                                    <FormLabel>
                                                        Message
                                                    </FormLabel>
                                                </Flex>
                                                <Input
                                                    type='text'
                                                    name={`question_${question.question_index}`}
                                                    value={question.question_value}
                                                    onChange={(e) => {
                                                        const new_questions = [...questions];
                                                        new_questions[questions.indexOf(question)].question_value = e.target.value;
                                                        setQuestions(new_questions);
                                                    }}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                    }}
                                                    required={true}
                                                />
                                                <FormHelperText>
                                                    This is the question that will be asked to the user.
                                                </FormHelperText>
                                            </FormControl>
                                            <FormControl>
                                                <Flex
                                                    flexDir={'row'}
                                                    justify={'space-between'}
                                                    w={'full'}
                                                    pb={2}
                                                    mt={5}
                                                >
                                                    <FormLabel>
                                                        Response
                                                    </FormLabel>
                                                </Flex>
                                                <Input
                                                    type='text'
                                                    name={`question_${question.question_index}`}
                                                    value={question.question_reply}
                                                    onChange={(e) => {
                                                        const new_questions = [...questions];
                                                        new_questions[questions.indexOf(question)].question_reply = e.target.value;
                                                        setQuestions(new_questions);
                                                    }}
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                    }}
                                                    required={true}
                                                />
                                                <FormHelperText>
                                                    After User answers the question, this is the message that will be sent to the user.
                                                </FormHelperText>
                                            </FormControl>
                                            <Divider />
                                            <FormControl
                                                mt={5}
                                            >
                                                <FormLabel>
                                                    What are you expecting as a response?
                                                </FormLabel>
                                                <Select
                                                    style={{
                                                        backgroundColor: 'white',
                                                        color: 'black',
                                                    }}
                                                    w={'max-content'}
                                                >
                                                    <option
                                                        value="TEXT"
                                                        selected={question.question_type === 'TEXT'}
                                                    >
                                                        Text
                                                    </option>
                                                    <option
                                                        value="VIDEO"
                                                        selected={question.question_type === 'VIDEO'}
                                                    >
                                                        VIDEO
                                                    </option>
                                                </Select>
                                            </FormControl>
                                            <Flex
                                                mt={5}
                                                justify={'flex-end'}
                                            >
                                                <Button
                                                    borderRadius={'full'}
                                                    colorScheme={'blue'}
                                                    w={'fit-content'}
                                                    onClick={() => handleCreateNewQuestion(questions.indexOf(question))}
                                                >
                                                    <Plus />
                                                </Button>
                                            </Flex>
                                            <Divider />
                                        </Flex>
                                    ))}
                                </Flex>
                            )
                        }
                    </Flex>
                </Flex>
                <DragDropGrid />
            </Flex>
        </Suspense>
    );
}
