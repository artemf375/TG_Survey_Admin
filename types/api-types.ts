type SurveyList = {
    id: number;
    survey_id: string;
    survey_name: string;
    timestamp_added: number;
    survey_owner_id: string;
    welcome_message: string;
}

type SurveyBasicInfo = {
    survey_id: string;
    questions: [
        {
            question_index: number;
            total_responses: number;
            question_value: string;
        }
    ]
}

export type { SurveyList, SurveyBasicInfo };