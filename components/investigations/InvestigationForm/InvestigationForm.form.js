import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    description: "",
    project: "",
    teams: [],
    scope: "",
    status: "en curso",
    investigation_types: [],
    researchers: [],
    team_extended: [],
    goal: "",
    specific_goals: "",
    guide: "",
    guide_media_link: "",
    initial_date: "",
    end_date: "",
    presented_to: "",
    presented_date: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string(),
    project: Yup.string(),
    teams: Yup.array(),
    scope: Yup.string(),
    status: Yup.string(),
    investigation_types: Yup.array(),
    researchers: Yup.array(),
    team_extended: Yup.array(),
    goal: Yup.string(),
    specific_goals: Yup.string(),
    guide: Yup.string(),
    guide_media_link: Yup.string(),
    initial_date: Yup.string(),
    end_date: Yup.string(),
    presented_to: Yup.string(),
    presented_date: Yup.string(),
  });
}
