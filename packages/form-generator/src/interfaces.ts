export enum FormInputTypes {
  MobileNumber = 'mobileNumber',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  Text = 'text',
  LongText = 'longText',
  FileUpload = 'fileUpload',
  DateTime = 'dateTime',
  Number = 'number',
  Range = 'range',
  Password = 'password',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Select = 'select',
  MultiSelect = 'multiSelect',
  URL = 'url',
  Search = 'search',
  Color = 'color',
  StarRating = 'starRating',
  MultimediaSuggestion = 'multimediaSuggestion',
  shareInfo = 'shareInfo',
  Nps = 'nps',
  // Add more input types here if necessary
}
interface Option {
  value: string
  label: string
}
export interface DisplayCondition {
  questionId: string
  operator: 'eq' | 'any' | 'gte' | 'lte' | 'notEqual' | 'any'
  value?: string | number | boolean
}
export interface FormField {
  name: string
  type: FormInputTypes
  label: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  options?: Option[]
  validationRules?: {
    required?: boolean | string
    minLength?: number | { value: number; message: string }
    maxLength?: number | { value: number; message: string }
    pattern?: RegExp | { value: RegExp; message: string }
    min?: number | { value: number; message: string }
    max?: number | { value: number; message: string }
    isEmail?: boolean | string
    isUrl?: boolean | string
    validate?: ((value: string) => boolean | string) | Record<string, (value: string) => boolean | string>
  }
  displayCondition?: DisplayCondition | DisplayCondition[]
  shareData?: any
}
