"use client";
import { SurveyList, SurveyBasicInfo } from "@/types/api-types";
import { Box, Button, Flex, Heading, Progress, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        }
    })

    const [surveys, setSurveys] = useState<SurveyList[]>([]);

    const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
    const [surveyInfo, setSurveyInfo] = useState<SurveyBasicInfo[]>([]);

    useEffect(() => {
        fetch(`/api/admin/getSurveys?email=${session?.user?.email}`)
            .then(response => response.json())
            .then((data: SurveyList[]) => {
                setSurveys(data);
            })
            .catch(error => {
                console.error('API error:', error);
            });
    }, [session, status])

    useEffect(() => {
        if (!selectedSurveyId) {
            return;
        }

        if (surveyInfo.findIndex(info => info.survey_id === selectedSurveyId) !== -1) {
            console.log('Already fetched');
            return;
        }

        fetch(`/api/admin/getSurveyInfo?id=${selectedSurveyId}`)
            .then(response => response.json())
            .then((data: SurveyBasicInfo) => {
                console.log(data);
                setSurveyInfo([...surveyInfo, data]);
            })
            .catch(error => {
                console.error('API error:', error);
            });
    }, [selectedSurveyId, surveyInfo])

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
                    >
                        <Heading className="text-4xl font-bold mb-4 text-gray-800">
                            Your Surveys
                        </Heading>
                        <Flex
                            flexDir={'row'}
                            align={'center'}
                        >
                            <Link href={'/admin/new_survey'}>
                                <Button
                                    borderRadius={'full'}
                                    colorScheme={'green'}
                                >
                                    <Plus />
                                </Button>
                            </Link>
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
                            surveys.length === 0 ? (
                                <Text>
                                    You have no surveys. Get started by creating a new survey.
                                </Text>
                            ) : (
                                <Accordion
                                    w={'full'}
                                    allowMultiple
                                    onChange={(index) => {
                                        if (Array.isArray(index)) {
                                            setSelectedSurveyId(surveys[index[0]].survey_id);
                                        } else {
                                            setSelectedSurveyId(surveys[index].survey_id);
                                        }
                                    }}
                                >
                                    {
                                        surveys.map(survey => (
                                            <AccordionItem key={survey.id}>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as='span' flex='1' textAlign='left' fontSize={'2xl'}>
                                                            {survey.survey_name}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Text>
                                                        Added at {new Date(survey.timestamp_added).toLocaleTimeString()} on {new Date(survey.timestamp_added).toLocaleDateString()}
                                                    </Text>
                                                    {
                                                        surveyInfo.find(info => info.survey_id === survey.survey_id)?.questions.map((info) => (
                                                            <div className="mt-2" key={info.question_index}>
                                                                <p><strong>Question {info.question_index}:</strong> {info.question_value}</p>
                                                                <p><strong>Total Responses:</strong> {info.total_responses}</p>
                                                                <Progress colorScheme={'green'} value={info.total_responses} max={surveyInfo.find(info => info.survey_id === survey.survey_id)?.questions.reduce((acc, curr) => Math.max(acc, curr.total_responses), 0)} />
                                                            </div>
                                                        )) ?? (
                                                            <Stack>
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                                <Skeleton height='20px' />
                                                            </Stack>
                                                        )
                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            )
                        }
                    </Flex>
                </Flex>
            </Flex>
        </Suspense>
    );
}
