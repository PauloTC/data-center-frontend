import { ENV } from "@/utils/constants";

export class Investigation {
  async createInvestigation(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      // Obtener la investigación creada
      const createdInvestigation = await this.getInvestigation(
        result.data.attributes.slug
      );

      return createdInvestigation;
    } catch (error) {
      throw error;
    }
  }

  async getInvestigations() {
    try {
      const populateInvestigation =
        "populate[0]=researchers.photo&populate[1]=materials&populate[2]=materials.locations";

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
      "populate[0]=researchers.photo&populate[1]=publics&populate[2]=investigation_types&populate[3]=locations&populate[4]=insights&populate[5]=guide_media&populate[6]=media&populate[7]=teams&populate[8]=team_extended&populate[9]=team_extended.photo&populate[10]=materials&populate[11]=materials.publics&populate[12]=materials.locations";

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
