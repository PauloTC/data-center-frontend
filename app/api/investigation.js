import { ENV } from "@/utils/constants";

export class Investigation {
  async getInvestigations() {
    try {
      const populateInvestigation =
        "populate[0]=researchers.photo&populate[1]=publics&populate[2]=locations";

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}?${populateInvestigation}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getInvestigation(slug) {
    const filter = `filters[slug][$eq]=${slug}`;

    const populateInvestigation =
      "populate[0]=researchers.photo&populate[1]=publics&populate[2]=investigation_types&populate[3]=locations&populate[4]=insights&populate[5]=guide_media&populate[6]=media&populate[7]=teams";

    const populates = `${populateInvestigation}`;

    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}?${filter}&${populateInvestigation}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
