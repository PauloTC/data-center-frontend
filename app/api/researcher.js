import { ENV } from "@/utils/constants";

export class Researcher {
  async getResearchers() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.RESEARCHERS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
