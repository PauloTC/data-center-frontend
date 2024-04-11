import { ENV } from "@/utils/constants";

export class Research {
  async getResearchs() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESEARCH}?populate=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getResearch(slug) {
    const filter = `filters[slug][$eq]=${slug}`;
    const populateProject =
      "populate[0]=project&populate[1]=researchers&populate[2]=image&populate[3]=insights";
    const populates = `${populateProject}`;

    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESEARCH}?${filter}&${populates}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }
}
