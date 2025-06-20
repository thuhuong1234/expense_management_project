import axios from "@/configs/axios.js";
class BaseService {
  async getAll(endpoint) {
    try {
      const response = await axios.get(endpoint);
      return {
        success: true,
        messages: response.messages,
        data: response.data,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async getById(endpoint, id) {
    try {
      const response = await axios.get(`${endpoint}/${id}`);
      return {
        data: response.data ?? [],
        success: true,
        messages: response.messages,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async create(endpoint, payload) {
    try {
      const response = await axios.post(`${endpoint}`, payload);
      return {
        data: response.data ?? [],
        success: true,
        messages: response.messages,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async update(endpoint, payload) {
    try {
      const response = await axios.put(`${endpoint}`, payload);
      return {
        data: response.data ?? [],
        success: true,
        messages: response.messages,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async delete(endpoint, id) {
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      return {
        data: response.data ?? [],
        success: true,
        messages: response.messages,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
  async deleteMultiple(endpoint, ids) {
    try {
      const response = await axios.delete(`${endpoint}`, {
        data: ids,
      });
      return {
        data: response.data ?? [],
        success: true,
        messages: response.messages,
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}
export default new BaseService();
