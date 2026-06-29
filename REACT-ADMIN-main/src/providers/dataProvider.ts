import type { DataProvider } from "react-admin";
import { localDataProvider } from "./localDataProvider";
import { ticketmasterDataProvider } from "./ticketmasterDataProvider";

/**
 * Routes calls for the "discovery" resource (real-world events) to the
 * Ticketmaster Discovery API, and everything else (our own managed
 * "events") to the local json-server backend.
 */
export const dataProvider: DataProvider = {
  getList: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.getList(resource, params)
      : localDataProvider.getList(resource, params),

  getOne: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.getOne(resource, params)
      : localDataProvider.getOne(resource, params),

  getMany: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.getMany(resource, params)
      : localDataProvider.getMany(resource, params),

  getManyReference: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.getManyReference(resource, params)
      : localDataProvider.getManyReference(resource, params),

  create: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.create(resource, params)
      : localDataProvider.create(resource, params),

  update: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.update(resource, params)
      : localDataProvider.update(resource, params),

  updateMany: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.updateMany(resource, params)
      : localDataProvider.updateMany(resource, params),

  delete: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.delete(resource, params)
      : localDataProvider.delete(resource, params),

  deleteMany: (resource, params) =>
    resource === "discovery"
      ? ticketmasterDataProvider.deleteMany(resource, params)
      : localDataProvider.deleteMany(resource, params),
};
