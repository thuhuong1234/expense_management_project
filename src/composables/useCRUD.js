import BaseService from "@/services/BaseService.js";
import { useUiStore } from "../stores/uiStore.js";
export default function useCRUD() {
  const getAll = async (endpoint) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.getAll(endpoint);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };
  const getById = async (endpoint, id) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.getById(endpoint, id);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };
  const create = async (endpoint, payload) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.create(endpoint, payload);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };

  const update = async (endpoint, payload) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.update(endpoint, payload);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };

  const deleteMultiple = async (endpoint, ids) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.deleteMultiple(endpoint, ids);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };

  const deleteById = async (endpoint, id) => {
    useUiStore().setLoading(true);
    useUiStore().setError(null);
    try {
      const response = await BaseService.delete(endpoint, id);
      if (response.success) {
        useUiStore().setMessages(response.messages);
        useUiStore().setData(response.data);
        return response;
      }
    } catch (error) {
      useUiStore().setError(error);
      throw error;
    } finally {
      useUiStore().setLoading(false);
    }
  };
  return {
    getAll,
    getById,
    create,
    update,
    deleteMultiple,
    deleteById,
  };
}
