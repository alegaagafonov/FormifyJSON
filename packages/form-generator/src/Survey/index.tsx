import React from "react";

import Header from "./Header";
import Body from "./Body";
import { Box } from "@mui/material";
import { Project } from "@formify-json/types-and-schemas";

export interface Api {
  sendVerification: (params: {
    phoneNumber: string;
    projectId: string;
  }) => Promise<any>;
  verifyUser: (params: { phoneNumber: string; code: number }) => Promise<any>;
  saveFeedback: (params: { projectId: string; data: any }) => Promise<any>;
}

export const Survey = ({ project, api }: { project: Project; api: Api }) => {
  console.log("SURVEY-project", project);
  return (
    <Box
      component="div"
      sx={{
        maxWidth: "630px",
        display: "flex",
        flexDirection: "column",
        // alignItems: 'center', // remove this line
        "& .MuiButton-root": { m: 2 },
      }}
    >
      {/* @ts-ignore */}
      <Header {...project} />
      <Body
        api={api}
        thankYouPage={project.thankYouPage}
        // @ts-ignore
        formInputs={project.formInputs}
        project={project}
      />
    </Box>
  );
};
