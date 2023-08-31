import React from "react";
import Header from "./Header";
import { Survey as Body } from "./Body";
import { Project } from "@formify-json/types-and-schemas";

export const Survey = (project: Project) => {
  return (
    <>
      {/* @ts-ignore */}
      <Header {...project} />
      <Body
        thankYouPage={project.thankYouPage}
        // @ts-ignore
        formInputs={project.formInputs}
      />
    </>
  );
};
