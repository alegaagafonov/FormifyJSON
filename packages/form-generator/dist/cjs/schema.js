"use strict";
exports.__esModule = true;
exports.FormInputSchema = exports.DisplayConditionSchema = exports.numberOrComplex = exports.FormInputEnum = void 0;
var zod_1 = require("zod");
var FormInputSchemaEnum = zod_1.z["enum"]([
    'mobileNumber',
    'phoneNumber',
    'email',
    'text',
    'longText',
    'fileUpload',
    'dateTime',
    'number',
    'range',
    'password',
    'radio',
    'checkbox',
    'select',
    'multiSelect',
    'url',
    'search',
    'color',
    'starRating',
    'multimediaSuggestion',
    'shareInfo',
    'nps',
]);
exports.FormInputEnum = FormInputSchemaEnum["enum"];
exports.numberOrComplex = zod_1.z.union([
    zod_1.z.number(),
    zod_1.z.object({
        value: zod_1.z.number(),
        message: zod_1.z.string()
    }),
]);
var regexOrComplex = zod_1.z.union([
    zod_1.z["instanceof"](RegExp),
    zod_1.z.object({
        value: zod_1.z["instanceof"](RegExp),
        message: zod_1.z.string()
    }),
]);
var booleanOrString = zod_1.z.union([zod_1.z.boolean(), zod_1.z.string()]);
var validateOption = zod_1.z.union([
    zod_1.z["function"](zod_1.z.tuple([zod_1.z.string()]), zod_1.z.union([zod_1.z.boolean(), zod_1.z.string()])),
    zod_1.z.record(zod_1.z["function"](zod_1.z.tuple([zod_1.z.string()]), zod_1.z.union([zod_1.z.boolean(), zod_1.z.string()]))),
]);
var ValidationRules = zod_1.z.object({
    required: booleanOrString.optional(),
    minLength: exports.numberOrComplex.optional(),
    maxLength: exports.numberOrComplex.optional(),
    pattern: regexOrComplex.optional(),
    min: exports.numberOrComplex.optional(),
    max: exports.numberOrComplex.optional(),
    isEmail: booleanOrString.optional(),
    isUrl: booleanOrString.optional(),
    validate: validateOption.optional()
});
var ShareDataSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    url: zod_1.z.string().optional(),
    text: zod_1.z.string().optional(),
    image: zod_1.z.string().optional()
});
exports.DisplayConditionSchema = zod_1.z
    .object({
    questionId: zod_1.z.string(),
    operator: zod_1.z.string(),
    value: zod_1.z.number().optional()
})
    .optional();
exports.FormInputSchema = zod_1.z.object({
    name: zod_1.z.string(),
    label: zod_1.z.string().optional(),
    placeholder: zod_1.z.string().optional(),
    isDisabled: zod_1.z.boolean().optional(),
    defaultValue: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
    type: FormInputSchemaEnum,
    options: zod_1.z.array(zod_1.z.union([zod_1.z.string(), zod_1.z.number()])).optional(),
    displayCondition: exports.DisplayConditionSchema,
    validationRules: ValidationRules.optional(),
    shareData: ShareDataSchema.optional()
});
//# sourceMappingURL=schema.js.map