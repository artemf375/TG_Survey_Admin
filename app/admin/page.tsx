"use client";
import { SurveyList, SurveyBasicInfo } from "@/types/api-types";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

export default function Dashboard() {
    const { data: session, status } = useSession()

    const [surveys, setSurveys] = useState<SurveyList[]>([]);

    const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
    const [surveyInfo, setSurveyInfo] = useState<SurveyBasicInfo[]>([]);

    useEffect(() => {
        // if (!session) {
        //   signIn();
        //   return;
        // }

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

    }, [selectedSurveyId])

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
                    <Heading className="text-4xl font-bold mb-4 text-gray-800">
                        Your Surveys
                    </Heading>

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
                                                    {/* <Text>
                            {survey.welcome_message}
                          </Text> */}
                                                    <Text>
                                                        Added at {new Date(survey.timestamp_added).toLocaleTimeString()} on {new Date(survey.timestamp_added).toLocaleDateString()}
                                                    </Text>
                                                    {
                                                        surveyInfo.find(info => info.survey_id === survey.survey_id)?.questions.map((info) => (
                                                            <div className="mt-2" key={info.question_index}>
                                                                <p><strong>Question {info.question_index}:</strong> {info.question_value}</p>
                                                                <p><strong>Total Responses:</strong> {info.total_responses}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            )
                        }
                    </Flex>

                    {/* <ul>
          {surveys.length > 0 && surveys.map(survey => (
            <li key={survey.id} className="border-b border-gray-200 py-2">
              <div onClick={() => setSelectedSurveyId(survey.survey_id)} className="cursor-pointer">
                {new Date(survey.timestamp_added).toLocaleDateString()}
              </div>
              {selectedSurveyId === survey.survey_id && surveyInfo && (
                <>
                  {surveyInfo.map((info) => (
                    <div className="mt-2" key={info.question_index}>
                      <p><strong>Question {info.question_index}:</strong> {info.question_value}</p>
                      <p><strong>Total Responses:</strong> {info.total_responses}</p>
                    </div>
                  )
                  )}
                </>
              )}
            </li>
          ))}
        </ul> */}
                </Flex>
            </Flex>
        </Suspense>
    );
}
