"use strict";
var _a;
exports.__esModule = true;
exports.FormifyJSON = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var material_1 = require("@mui/material");
var types_and_schemas_1 = require("types-and-schemas");
var FormInputs_1 = require("./FormInputs");
// useFormContext
// Form input type to component mapping
var inputTypeComponentMap = (_a = {},
    _a[types_and_schemas_1.FormInputEnum.starRating] = FormInputs_1.StarRatingInput,
    _a[types_and_schemas_1.FormInputEnum.multimediaSuggestion] = FormInputs_1.MultimediaSuggestionInput,
    _a[types_and_schemas_1.FormInputEnum.nps] = FormInputs_1.NpsInput,
    _a);
var FormifyJSON = function (_a) {
    var inputs = _a.inputs, onSave = _a.onSave, conditionallyRenderSaveButton = _a.conditionallyRenderSaveButton, _b = _a.initalValues, initalValues = _b === void 0 ? {} : _b;
    var _c = (0, react_1.useState)(false), saving = _c[0], setSaving = _c[1];
    var methods = (0, react_hook_form_1.useForm)({ defaultValues: initalValues });
    var watch = methods.watch, getValues = methods.getValues;
    var watchedValues = watch();
    var onSubmit = function (data) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSaving(true);
                    return [4 /*yield*/, onSave(data)];
                case 1:
                    _a.sent();
                    setSaving(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var renderSaveButton = function () {
        if (!conditionallyRenderSaveButton ||
            conditionallyRenderSaveButton(getValues())) {
            return (react_1["default"].createElement(material_1.Button, { type: "submit", variant: "contained", color: "primary", disabled: saving }, saving ? "Saving..." : "Save"));
        }
        return null;
    };
    var displayInput = function (input) {
        if (!input.displayCondition)
            return true;
        var condition = input.displayCondition;
        var dependentFieldValue = watchedValues[condition.questionId];
        switch (condition.operator) {
            case "eq":
                return condition.value !== undefined
                    ? dependentFieldValue === condition.value
                    : false;
            case "any":
                return !!dependentFieldValue;
            case "gte":
                return condition.value !== undefined
                    ? dependentFieldValue >= condition.value
                    : false;
            case "lte":
                return condition.value !== undefined
                    ? dependentFieldValue <= condition.value
                    : false;
            case "notEqual":
                return condition.value !== undefined
                    ? dependentFieldValue !== condition.value
                    : false;
            default:
                return true;
        }
    };
    // if (Array.isArray(input.displayCondition)) {
    //   // Check all conditions if displayCondition is an array
    //   return input.displayCondition.every((condition) => evaluateDisplayCondition(condition, watchedValues))
    // }
    return (react_1["default"].createElement(react_hook_form_1.FormProvider, tslib_1.__assign({}, methods),
        react_1["default"].createElement("form", { onSubmit: methods.handleSubmit(onSubmit) },
            inputs.map(function (input) {
                // @ts-ignore
                var InputComponent = inputTypeComponentMap[input.type];
                if (displayInput(input)) {
                    return InputComponent ? (react_1["default"].createElement(InputComponent, tslib_1.__assign({ key: input.name }, input))) : null;
                }
                else {
                    return null;
                }
            }),
            renderSaveButton())));
};
exports.FormifyJSON = FormifyJSON;
//# sourceMappingURL=FormRenderer.js.map