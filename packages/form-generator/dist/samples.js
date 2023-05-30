"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formInputs = void 0;
const interfaces_1 = require("./interfaces");
exports.formInputs = [
    {
        name: 'overallGrade',
        label: 'How would you rate your overall experience?',
        type: interfaces_1.FormInputTypes.StarRating
    },
    {
        name: 'detailedFeedback',
        label: 'What could we do better?',
        type: interfaces_1.FormInputTypes.MultimediaSuggestion,
        placeholder: 'Please let us know what aspects of our product or service disappointed you and how we can improve.',
        displayCondition: {
            questionId: 'overallGrade',
            operator: 'lte',
            value: 2
        }
    },
    {
        name: 'detailedFeedback',
        label: 'What could we improve?',
        type: interfaces_1.FormInputTypes.MultimediaSuggestion,
        placeholder: 'What aspects of our product or service can be improved to meet your expectations better?',
        displayCondition: {
            questionId: 'overallGrade',
            operator: 'eq',
            value: 3
        }
    },
    {
        name: 'detailedFeedback',
        label: 'What do you like the most?',
        type: interfaces_1.FormInputTypes.MultimediaSuggestion,
        placeholder: "We're glad you're satisfied! Please share any suggestions for further improvements or features you'd like to see.",
        displayCondition: {
            questionId: 'overallGrade',
            operator: 'gte',
            value: 4
        }
    }
    // {
    //   id: SatisfactorySurveyKeys.nps,
    //   title:
    //     'How likely are you to recommend our product to a friend or colleague?',
    //   type: FormInputTypes.Nps,
    //   displayCondition: {
    //     questionId: SatisfactorySurveyKeys.overallGrade,
    //     operator: 'any'
    //   }
    // },
    // {
    //   id: SatisfactorySurveyKeys.shareInfo,
    //   title: 'Would you like to share our product with your friends?',
    //   type: FormInputTypes.shareInfo,
    //   shareData: {
    //     title: 'Check out this amazing app!',
    //     text: 'I found this great app you might be interested in.',
    //     url: 'https://example.com/app'
    //   },
    //   displayCondition: {
    //     questionId: SatisfactorySurveyKeys.nps,
    //     operator: 'gte',
    //     value: 7
    //   }
    // }
];
