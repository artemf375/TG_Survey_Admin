type SurveyList = {
    id: number;
    survey_id: string;
    survey_name: string;
    timestamp_added: number;
    survey_owner_id: string;
    welcome_message: string;
}

type SurveyQuestionInfo = {
    question_index: number;
    total_responses: number;
    question_value: string;
}

type SurveyBasicInfo = {
    survey_id: string;
    questions: SurveyQuestionInfo[]
}

type UserInfo = {
    id: number,
    owner_id: string,
    owner_email: string,
    owner_name: string,
    timestamp_added: number
}

type SurveyQuestion = {
    question_index: number;
    question_value: string;
    question_reply: string;
    question_type: "TEXT" | "VIDEO" | "IMAGE" | "AUDIO";
    reply_markup: JSON;
}

type SurveyOwner = {
    id: number;
    owner_id: string;
    owner_email: string;
    owner_name: string;
    timestamp_added: number;
}

export type { SurveyList, SurveyBasicInfo, UserInfo, SurveyQuestion, SurveyOwner, SurveyQuestionInfo };