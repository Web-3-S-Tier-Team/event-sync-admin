import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

export const exporter = (records: any[], _fetchRelatedRecords: any, _dataProvider: any, resource: string) => {
  // Remove binary image data before export
  const cleanRecords = records.map(({ image, ...rest }) => rest);
  jsonExport(cleanRecords, (_err: any, csv: string) => {
    downloadCSV(csv, resource ?? "export");
  });
};
