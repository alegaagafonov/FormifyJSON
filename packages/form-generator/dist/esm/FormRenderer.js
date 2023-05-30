var _a;
import { __assign, __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import { FormInputEnum } from "types-and-schemas";
import { StarRatingInput, MultimediaSuggestionInput, NpsInput, } from "./FormInputs";
// useFormContext
// Form input type to component mapping
var inputTypeComponentMap = (_a = {},
    _a[FormInputEnum.starRating] = StarRatingInput,
    _a[FormInputEnum.multimediaSuggestion] = MultimediaSuggestionInput,
    _a[FormInputEnum.nps] = NpsInput,
    _a);
export var FormifyJSON = function (_a) {
    var inputs = _a.inputs, onSave = _a.onSave, conditionallyRenderSaveButton = _a.conditionallyRenderSaveButton, _b = _a.initalValues, initalValues = _b === void 0 ? {} : _b;
    var _c = useState(false), saving = _c[0], setSaving = _c[1];
    var methods = useForm({ defaultValues: initalValues });
    var watch = methods.watch, getValues = methods.getValues;
    var watchedValues = watch();
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
            return (React.createElement(Button, { type: "submit", variant: "contained", color: "primary", disabled: saving }, saving ? "Saving..." : "Save"));
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
    return (React.createElement(FormProvider, __assign({}, methods),
        React.createElement("form", { onSubmit: methods.handleSubmit(onSubmit) },
            inputs.map(function (input) {
                // @ts-ignore
                var InputComponent = inputTypeComponentMap[input.type];
                if (displayInput(input)) {
                    return InputComponent ? (React.createElement(InputComponent, __assign({ key: input.name }, input))) : null;
                }
                else {
                    return null;
                }
            }),
            renderSaveButton())));
};
//# sourceMappingURL=FormRenderer.js.map