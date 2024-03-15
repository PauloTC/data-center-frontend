import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    description: "",
    project: "",
    teams: [],
    date: "",
    scope: "",
    status: "en curso",
    publics: [],
    investigation_types: [],
    sample: "",
    locations: [],
    researchers: [],
    goal: "",
    specific_goals: "",
    guide: "",
    guide_media_link: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    description: Yup.string().required(true),
    project: Yup.string().required(true),
    teams: Yup.array().required(true),
    date: Yup.string().required(true),
    scope: Yup.string().required(true),
    status: Yup.string().required(true),
    publics: Yup.array(),
    investigation_types: Yup.array(),
    sample: Yup.string(),
    locations: Yup.array(),
    researchers: Yup.array(),
    goal: Yup.string(),
    specific_goals: Yup.string(),
    guide: Yup.string(),
    guide_media_link: Yup.string(),
  });
}
