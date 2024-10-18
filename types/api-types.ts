type SurveyList = {
    id: number;
    survey_id: string;
    timestamp_added: number;
    survey_owner_id: string;
    welcome_message: string;
}

type SurveyBasicInfo = {
    question_index: number;
    total_responses: number;
    question_value: string;
}

export type { SurveyList, SurveyBasicInfo };