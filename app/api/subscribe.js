import { ENV } from "@/utils/constants";

export class Subscribe {
  async createSubscribe(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.SUBSCRIBERS}`;
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

      console.log(url);

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSubscribers() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.SUBSCRIBERS}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
