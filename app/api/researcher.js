import { ENV } from "@/utils/constants";

export class Researcher {
  async getResearchersByRole(role) {
    const filter = `filters[role][$eq]=${role}`;

    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESEARCHERS}?${filter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async getResearchersOtherRole() {
    const filter = `filters[role][$ne]=researcher`;

    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESEARCHERS}?${filter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
