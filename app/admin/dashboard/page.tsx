"use client";
import { SurveyList, SurveyBasicInfo } from "@/types/api-types";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

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

    fetch('/api/admin/getSurveys')
      .then(response => response.json())
      .then((data: SurveyList[]) => {
        console.log(data);
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

    fetch(`/api/admin/getSurveyInfo?id=${selectedSurveyId}`)
      .then(response => response.json())
      .then((data: SurveyBasicInfo[]) => {
        setSurveyInfo(data);
      })
      .catch(error => {
        console.error('API error:', error);
      });

  }, [selectedSurveyId])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Dashboard
      </h1>
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
          Surveys
        </h2>
        <ul>
          {surveys.map(survey => (
            <li key={survey.id} className="border-b border-gray-200 py-2">
              <div onClick={() => setSelectedSurveyId(survey.survey_id)} className="cursor-pointer">
                 {new Date(survey.timestamp_added).toLocaleDateString()}
              </div>
              {selectedSurveyId === survey.survey_id && surveyInfo && (
                <>
                  {surveyInfo.map((info) => (
                    <div className="mt-2">
                      <p><strong>Question {info.question_index}:</strong> {info.question_value}</p>
                      <p><strong>Total Responses:</strong> {info.total_responses}</p>
                    </div>
                  )
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
