import { z } from "zod";

const FormInputSchemaEnum = z.enum([
  "mobileNumber",
  "phoneNumber",
  "email",
  "text",
  "longText",
  "fileUpload",
  "dateTime",
  "number",
  "range",
  "password",
  "radio",
  "checkbox",
  "select",
  "multiSelect",
  "url",
  "search",
  "color",
  "starRating",
  "multimediaSuggestion",
  "shareInfo",
  "nps",
]);
export const FormInputEnum = FormInputSchemaEnum.enum;
export const numberOrComplex = z.union([
  z.number(),
  z.object({
    value: z.number(),
    message: z.string(),
  }),
]);

const regexOrComplex = z.union([
  z.instanceof(RegExp),
  z.object({
    value: z.instanceof(RegExp),
    message: z.string(),
  }),
]);

const booleanOrString = z.union([z.boolean(), z.string()]);

const validateOption = z.union([
  z.function(z.tuple([z.string()]), z.union([z.boolean(), z.string()])),
  z.record(
    z.function(z.tuple([z.string()]), z.union([z.boolean(), z.string()]))
  ),
]);

const ValidationRules = z.object({
  required: booleanOrString.optional(),
  minLength: numberOrComplex.optional(),
  maxLength: numberOrComplex.optional(),
  pattern: regexOrComplex.optional(),
  min: numberOrComplex.optional(),
  max: numberOrComplex.optional(),
  isEmail: booleanOrString.optional(),
  isUrl: booleanOrString.optional(),
  validate: validateOption.optional(),
});

const ShareDataSchema = z.object({
  title: z.string().optional(),
  url: z.string().optional(),
  text: z.string().optional(),
  image: z.string().optional(),
});
export const DisplayConditionSchema = z
  .object({
    questionId: z.string(),
    operator: z.string(),
    value: z.number().optional(),
  })
  .optional();

export const FormInputSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  isDisabled: z.boolean().optional(),
  defaultValue: z.union([z.string(), z.number()]).optional(),
  type: FormInputSchemaEnum,
  options: z.array(z.union([z.string(), z.number()])).optional(),
  displayCondition: DisplayConditionSchema,
  validationRules: ValidationRules.optional(),
  shareData: ShareDataSchema.optional(),
});
export type DisplayCondition = z.infer<typeof DisplayConditionSchema>;
export type FormInput = z.infer<typeof FormInputSchema>;
